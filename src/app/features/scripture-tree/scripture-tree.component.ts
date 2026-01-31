import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Scripture } from '../../core/services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scripture-tree',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './scripture-tree.component.html',
  styleUrl: './scripture-tree.component.css'
})
export class ScriptureTreeComponent {
  private api = inject(ApiService);

  allScriptures: Scripture[] = [];
  categories: string[] = [];
  selectedCategory: string = ''; 
  
  newVerse = '';
  newRef = '';
  newCat = '';

  constructor() {
    this.loadScriptures();
  }

  loadScriptures() {
    this.api.getScriptures().subscribe(data => {
      this.allScriptures = data;
      const uniqueCats = [...new Set(data.map(s => s.category))];
      this.categories = uniqueCats.sort();
      
      if (this.categories.length > 0 && !this.selectedCategory) {
        this.selectedCategory = this.categories[0];
      }
    });
  }

  getVerses(category: string) {
    return this.allScriptures.filter(s => s.category === category);
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  addScripture() {
    if (!this.newVerse || !this.newRef || !this.newCat) return;

    const newEntry: Scripture = {
      text: this.newVerse, // CHANGED: Key is now 'text'
      reference: this.newRef,
      category: this.newCat
    };

    this.api.addScripture(newEntry).subscribe(saved => {
      this.allScriptures.push(saved);
      if (!this.categories.includes(saved.category)) {
        this.categories.push(saved.category);
        this.categories.sort();
      }
      this.selectedCategory = saved.category;
      this.newVerse = '';
      this.newRef = '';
      this.newCat = '';
    });
  }
}
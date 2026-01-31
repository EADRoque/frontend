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
  selectedCategory: string = 'All'; // Default view
  
  // Form inputs
  newVerse = '';
  newRef = '';
  newCat = '';

  constructor() {
    this.loadScriptures();
  }

  loadScriptures() {
    this.api.getScriptures().subscribe(data => {
      this.allScriptures = data;
      // Get unique categories and sort them
      const uniqueCats = [...new Set(data.map(s => s.category))];
      this.categories = uniqueCats.sort();
      
      // Default to the first category if we have data and nothing is selected
      if (this.categories.length > 0 && this.selectedCategory === 'All') {
        this.selectedCategory = this.categories[0];
      }
    });
  }

  // Filter verses for the UI
  getVerses(category: string) {
    return this.allScriptures.filter(s => s.category === category);
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  addScripture() {
    if (!this.newVerse || !this.newRef || !this.newCat) return;

    const newEntry: Scripture = {
      verse_text: this.newVerse,
      reference: this.newRef,
      category: this.newCat
    };

    this.api.addScripture(newEntry).subscribe(saved => {
      this.allScriptures.push(saved);
      
      // If this is a new category, add it to our list
      if (!this.categories.includes(saved.category)) {
        this.categories.push(saved.category);
        this.categories.sort();
      }
      
      // Switch view to the new entry
      this.selectedCategory = saved.category;
      
      // Reset form
      this.newVerse = '';
      this.newRef = '';
      this.newCat = '';
    });
  }
}
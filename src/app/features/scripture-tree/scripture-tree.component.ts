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

  removeScripture(id: number | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to remove this verse from your garden?')) {
      this.api.deleteScripture(id).subscribe(() => {
        // Remove it from the local list so the UI updates instantly
        this.allScriptures = this.allScriptures.filter(s => s.id !== id);
      });
    }
  }

  removeCategory(catName: string, event: Event) {
    // Prevent the click from also triggering 'selectCategory'
    event.stopPropagation();

    if (confirm(`Are you sure you want to delete the entire '${catName}' branch?`)) {
      this.api.deleteCategory(catName).subscribe(() => {
        // Remove all local scriptures belonging to that category
        this.allScriptures = this.allScriptures.filter(s => s.category !== catName);
        
        // Update categories list
        this.categories = this.categories.filter(c => c !== catName);
        
        // Reset view to the first available category or empty
        this.selectedCategory = this.categories[0] || '';
      });
    }
  }
}
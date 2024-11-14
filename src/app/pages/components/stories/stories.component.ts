import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story.service';
import { StoryI } from '../../../models/story';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  stories: StoryI[] = [];
  showLargeImage: boolean = false;
  selectedImage: string = '';
  selectedUsername: string = '';
  selectedUserImage: string = '';

  constructor(private storyService: StoryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.storyService.getStories().subscribe(
      (stories: StoryI[]) => {
        this.stories = stories;
        console.log(stories.map(story => story.image)); // Verifica las URLs de las imágenes
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }

  toggleShowLargeImage(): void {
    this.showLargeImage = !this.showLargeImage;
  }

  setLargeImage(story: StoryI): void {
    this.selectedImage = story.image;
    this.selectedUsername = story.user.username;
    this.selectedUserImage = story.user.userImage;
    this.showLargeImage = true;
  }
}

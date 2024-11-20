import { Component } from '@angular/core';
import { PostI } from '../../models/post.interface';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  posts: PostI[] = [];
  showLargeImage: boolean = false;
  selectedImage: string | undefined = '';
  selectedUsername: string = '';
  selectedUserImage: string = '';

  constructor(private translationService: TranslationService,
    private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.findPosts().subscribe(
      (posts: PostI[]) => {
        this.posts = posts;
        console.log(posts);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  toggleShowLargeImage(): void {
    this.showLargeImage = !this.showLargeImage;
  }

  setLargeImage(post: PostI): void {
    this.selectedImage = post.image;
   // this.selectedUsername = post.text;
    //this.selectedUserImage = post.tag;
    this.showLargeImage = true;
  }
}

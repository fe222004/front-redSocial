import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { PostI } from '../../../models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly postService: PostService = inject(PostService);
  private readonly authService: AuthService = inject(AuthService);

  form: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;

  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    // This method is not currently implemented
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(2)]],
      tag: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  chooseFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  getFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          this.imageSrc = result;
        }
      };
      reader.readAsDataURL(file);
      this.form.get('image')?.setValue(file);
    }
  }

  clearImage() {
    this.imageSrc = null;
    this.form.get('image')?.setValue(null);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    const file = this.form.get('image')?.value;
    const text = this.form.get('text')?.value;
    const tag = this.form.get('tag')?.value;
    const userId = this.authService.getUserId() || ''; // Obtener el ID del usuario logueado

    if (file) {
      formData.append('image', file);
    }
    formData.append('text', text);
    formData.append('tag', tag);
    formData.append('userId', userId);

    this.postService.createPost(formData).subscribe(
      (response: PostI) => {
        console.log('Post created successfully:', response);
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}

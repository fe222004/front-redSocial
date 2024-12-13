import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { PostI } from '../../../models/post.interface';
import { TranslationService } from '../../../services/translation.service';

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
  imageSrc: string | ArrayBuffer | null = null; // Solo para imágenes
  videoSrc: string | ArrayBuffer | null = null; // Solo para videos
  isButtonVisible: boolean = false;


  constructor(private translationService: TranslationService,) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.form.get('text')?.valueChanges.subscribe(value => {
      this.isButtonVisible = value && value.trim().length > 0;
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(2)]],
      tag: ['', Validators.required], // categoría
      media: ['', Validators.required],  // Para imagen o video
    });
  }

  chooseImage() {
    const fileInputImage = document.getElementById('fileInputImage') as HTMLInputElement;
    fileInputImage.click();
  }

  chooseVideo() {
    const fileInputVideo = document.getElementById('fileInputVideo') as HTMLInputElement;
    fileInputVideo.click();
  }

  getImageFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      if (file.type.startsWith('image/')) {
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result) {
            this.imageSrc = result;
            this.videoSrc = null;  // Limpiar video si seleccionamos imagen
            this.form.get('media')?.setValue(file);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona solo un archivo de imagen.');
      }
    }
  }

  getVideoFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      if (file.type.startsWith('video/')) {
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result) {
            this.videoSrc = result;
            this.imageSrc = null;  // Limpiar imagen si seleccionamos video
            this.form.get('media')?.setValue(file);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona solo un archivo de video.');
      }
    }
  }

  clearMedia() {
    this.imageSrc = null;
    this.videoSrc = null;
    this.form.get('media')?.setValue(null);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    const file = this.form.get('media')?.value;
    const text = this.form.get('text')?.value;
    const tag = this.form.get('tag')?.value;
    const userId = this.authService.getUserId() || '';  // Obtener el ID del usuario logueado

    if (file) {
      formData.append('media', file);
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

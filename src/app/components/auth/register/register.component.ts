import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { PlaceholderConstants } from '../../../constants/placeholder-constants';
import { TranslationService } from '../../../services/translation.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly userService: UserService = inject(UserService);

  private readonly authService: AuthService = inject(AuthService);

  profile = PlaceholderConstants.register;

  public showAlert: boolean = false;

  public loginForm: FormGroup;
  public imageSrc: string | ArrayBuffer | null | undefined = null;
  public files: any[] = [];
  public errorMessage: string | null = null;

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {
    this.loginForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(40),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(40),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
        ],
      ],
      image: [''],
    });
  }

  get image(): AbstractControl {
    return this.loginForm.controls['image'];
  }
  get lastname(): AbstractControl {
    return this.loginForm.controls['lastname'];
  }
  get firstname(): AbstractControl {
    return this.loginForm.controls['firstname'];
  }
  get email(): AbstractControl {
    return this.loginForm.controls['email'];
  }
  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }

  getFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.files = [file];
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = new FormData();

    formData.append('lastname', this.loginForm.value.lastname);
    formData.append('firstname', this.loginForm.value.firstname);
    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);

    const file = this.files[0];
    formData.append('avatar', file);

    console.log(file, file.name);

    // Verificar que formData contiene los datos correctos
    // Verificar que formData contiene los datos correctos
    formData.forEach((value, key) => {
      console.log(key, value); // Verifica los datos del FormData
    });

    console.log('control', formData);
    this.authService.register(formData).subscribe(
      (response: User) => {
        this.showAlert = true;
      },
      (error) => {
        alert('Register failed');
      }
    );
  }

  chooseFile() {
    const inputElement = document.getElementById(
      'fileInput'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }

  clearImage() {
    this.imageSrc = null;
    this.files = [];
    this.loginForm.get('image')?.setValue(null);
  }

  // Arrastrar y soltar imagen
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  //Maneja el archivo
  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result;
    };
    reader.readAsDataURL(file);
    this.files = [file];
  }
}

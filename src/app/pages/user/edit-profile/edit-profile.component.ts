import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly userService: UserService = inject(UserService);

  private readonly countryService: CountryService = inject(CountryService);
  private readonly rolService: RolService = inject(RolService);

  public editForm: FormGroup;
  public imageSrc: string | ArrayBuffer | null | undefined = null;
  public files: any[] = [];
  public errorMessage: string | null = null;

  countries: Country[] = [];
  roles: Rol[] = [];

  user: User = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    image: '',
    description: '',
    countryId: 0,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUser(userId).subscribe((response: User) => {
          this.user = response; // Guardar toda la información del usuario
          this.imageSrc = response.image; // Mostrar la imagen actual del usuario
          this.initForm();
        });
      }
    });
    this.editForm = this.buildForm();
    this.getCountries();
    this.getRol();
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
      description: ['', [Validators.maxLength(200)]],
      countryId: [''],
    });
  }

  initForm(): void {
    this.editForm.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      description: this.user.description,
      countryId: this.user.countryId,
    });
  }

  get firstname(): AbstractControl {
    return this.editForm.controls['firstname'];
  }

  get lastname(): AbstractControl {
    return this.editForm.controls['lastname'];
  }

  get description(): AbstractControl {
    return this.editForm.controls['description'];
  }

  get countryId(): AbstractControl {
    return this.editForm.controls['countryId'];
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

  getCountries() {
    this.countryService.findCountries().subscribe((response) => {
      console.log(response);
      this.countries = response;
    });
  }

  getRol() {
    this.rolService.findRol().subscribe((response) => {
      console.log(response);
      this.roles = response;
    });
  }

  onSubmit(): void {
    console.log('Se ha hecho clic en el botón de envío.');
    if (this.editForm.invalid) {
      console.log('El formulario no es válido.');
      return;
    }

    const formData = new FormData();

    formData.append('lastname', this.editForm.value.lastname);
    formData.append('firstname', this.editForm.value.firstname);
    formData.append('countryId', this.editForm.value.countryId);
    formData.append('description', this.editForm.value.description);

    const file = this.files[0];
    if (file) {
      formData.append('image', file, file.name);
    }

    this.userService.updateUser(this.user.id, formData).subscribe(
      (response: User) => {
        console.log('User updated successfully:', response);
        const userId = this.authService.getUserId(); // Get user ID from AuthService
        console.log(userId);
        if (userId) {
          this.router.navigate(['/pages/user/profile', userId]); // Pass user ID as a route parameter
        } else {
        }
      },
      (error) => {
        console.error('Error updating user:', error);
        this.errorMessage = error; // Display error message
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
    console.log('Se ha hecho clic en el botón de limpiar imagen.');
    this.imageSrc = null;
    this.files = [];
    this.editForm.get('image')?.setValue(null);
  }

  onDrop(event: DragEvent) {
    console.log('Se ha soltado un archivo.');
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

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result;
    };
    reader.readAsDataURL(file);
    this.files = [file];
  }
}

import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  mostrarFormularioencuesta = true;
  private formBuilder = inject(FormBuilder);
  protected form: FormGroup;

  constructor(private router: Router) {
    this.form = this.buildForm;
  }

  get buildForm(): FormGroup {
    return this.formBuilder.group({
      categoriasFavoritas: ['', Validators.required],
      tipoContenido: ['', Validators.required],
      metodoNotificacion: ['', Validators.required],
      idioma: ['', Validators.required],
      horariosNotificaciones: ['', Validators.required]
    });
  }

  get categoriasFavoritas(): AbstractControl {
    return this.form.controls['categoriasFavoritas'];
  }
  get tipoContenido(): AbstractControl {
    return this.form.controls['tipoContenido'];
  }
  get metodoNotificacion(): AbstractControl {
    return this.form.controls['metodoNotificacion'];
  }
  get idioma(): AbstractControl {
    return this.form.controls['idioma'];
  }
  get horariosNotificaciones(): AbstractControl {
    return this.form.controls['horariosNotificaciones'];
  }
  
  mostrarFormulario() {
    this.mostrarFormularioencuesta = !this.mostrarFormularioencuesta;
  }

  onSubmit() {
    if (this.form.valid) {
      // Procesar los datos del formulario
      console.log(this.form.value);
      this.mostrarFormularioencuesta = false;  // Ocultar formulario después de enviar
      alert('Enviado');
      this.navigateToDashboard()

    } else {
      // Marcar todos los campos como tocados para activar validaciones
      this.form.markAllAsTouched();
      alert('No enviado');
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/pages/dashboard']);
}

  validataFormulario() {
    // Aquí puedes agregar validaciones adicionales si es necesario
  }
}

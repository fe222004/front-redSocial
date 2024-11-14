import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResolverI } from '../../../models/resolver';
import { ResolverService } from '../../../services/resolver.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  mostrarFormularioModal = false;
  private formBuilder = inject(FormBuilder);
  private readonly resolverService: ResolverService = inject(ResolverService);  
  protected form: FormGroup;

  resolvers : ResolverI[]=[];
  resolver : ResolverI = {};


  constructor(private router: Router) {
    this.getResolvers();
    this.form = this.buildForm;
  }

  get buildForm(): FormGroup {
    return (this.form = this.formBuilder.group({
      suspended_account: ['', Validators.required],
      status: ['', Validators.required],
    }));
  }

  get suspended_account(): AbstractControl {
    return this.form.controls['suspended_account'];
  }
  get status(): AbstractControl {
    return this.form.controls['status'];
  }

  getResolvers(){
    console.log("Entro al resolvers")
    this.resolverService.findResolver().subscribe(response => {
      console.log(response)
      this.resolvers = response
    });
  }

  //ACTUALIZA
  updateResolver(id: string, payload: ResolverI): void {
    console.log("Entro a actualizar", payload);
    this.resolverService.updateResolver(id, payload).subscribe(
      (response) => {
        console.log('Actualización exitosa:', response);
        this.getResolvers(); // Refresca la lista después de actualizar
        this.closeEditModal(); // Cerrar el modal después de actualizar
      },
      (error) => {
        console.error('Error al actualizar:', error);
      }
    );
  }

  openEditModal(resolver: ResolverI) {
    this.resolver = resolver;
    this.mostrarFormularioModal = true;
    // formulario con los valores actuales del resolver
    this.form.patchValue({
      suspended_account: resolver.suspended_account,
      status: resolver.status,
    });
  }

  
  closeEditModal() {
    this.mostrarFormularioModal = false;
  }

  onSubmit(): void {
    console.log("Entro");
    const id = this.resolver.id || ''; // Asegúrate de que el resolver tiene un ID válido
    if (id) {
      const payload = this.form.value;
      this.updateResolver(id, payload);
      this.closeEditModal(); // Cerrar el modal después de actualizar
    } else {
      console.error('El ID del resolver no está definido');
    }
  }

  validataForm(): void {
    console.log("Entro validata");
    const id = this.resolver.id || ''; //  un ID válido
    if (id) {
      const payload = this.form.value;
      this.updateResolver(id, payload);
      this.closeEditModal(); // Cerrar el modal después de actualizar
    } else {
      console.error('El ID del resolver no está definido');
    }
  }

  navigateToCustomerCreate() {
    this.router.navigate(['/pages/customer-create']);
  }
 




}

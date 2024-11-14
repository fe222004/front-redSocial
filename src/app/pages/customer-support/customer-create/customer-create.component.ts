import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ResolverService } from '../../../services/resolver.service';
import { RevisorService } from '../../../services/revisor.service';
import { Complaint } from '../../../models/Complaint';

declare var bootstrap: any;

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss',
})
export class CustomerCreateComponent {
  mostrarFormularioQuejas = false;

  private formBuilder = inject(FormBuilder);
  private readonly resolverService: ResolverService = inject(ResolverService);
 private readonly revisorService = inject (RevisorService);
  protected form: FormGroup;
 protected problem:Complaint[] =[];
  constructor(private router: Router) {
    this.form = this.buildForm;
    this.getAll();
    
  }

  get buildForm(): FormGroup {
    return (this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),],],
      solution: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', Validators.required],
      complaint_number: ['', [Validators.required, Validators.min(1)]],
      suspended_account: ['', Validators.required],
      responsible: ['', [Validators.required, Validators.minLength(2)]],
      status: ['', Validators.required],
    }));
  }

  get name(): AbstractControl {
    return this.form.controls['name'];
  }
  get lastname(): AbstractControl {
    return this.form.controls['lastname'];
  }
  get email(): AbstractControl {
    return this.form.controls['email'];
  }
  get solution(): AbstractControl {
    return this.form.controls['solution'];
  }
  get date(): AbstractControl {
    return this.form.controls['date'];
  }
  get complaint_number(): AbstractControl {
    return this.form.controls['complaint_number'];
  }
  get responsible(): AbstractControl {
    return this.form.controls['responsible'];
  }
  get suspended_account(): AbstractControl {
    return this.form.controls['suspended_account'];
  }
  get status(): AbstractControl {
    return this.form.controls['status'];
  }

  //REVISAR
  onSubmit(): void {
    console.log("Entro")
    if (this.form.invalid){
      return;
    }
    this.resolverService.createResolver(this.form.value).subscribe(() => {
      console.log("Entro", this.form.value)
    });

  }

  mostrarFormulario() {
    this.mostrarFormularioQuejas = true;
  }

  ocultarFormulario() {
    this.mostrarFormularioQuejas = false;
  }

  //LLEVA DATOS AL BACK
  validataForm() {
    if (this.form.valid) {
      alert('Registrado');
      this.resolverService.createResolver(this.form.value).subscribe(() => {
      });
      console.log("Entro", this.form.value)
      this.ocultarFormulario();
    } else {
      alert('No registrado');
    }
    console.log("Ingreso aqui")
  }

  navigateToCustomerList() {
    this.router.navigate(['/pages/customer-list']);
  }
 

  getAll(){
    this.revisorService.getAll().subscribe(response => {
       console.log(response);
       this.problem = response
    });

  }
 
}

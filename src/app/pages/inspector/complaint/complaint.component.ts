import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Complaint } from '../../../models/Complaint';
import { RevisorService } from '../../../services/revisor.service';
import { PostService } from '../../../services/post.service';
import { PostI } from '../../../models/post.interface';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.scss'
})
export class ComplaintComponent {
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;

  post: PostI[] = [];

  protected posts: PostI[] =[];
  logForm=this.formBuilder.group({
    name_offender:['',[Validators.required]],
     problem:['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
     problem_date: ['',[Validators.required]],
     problem_hour: ['',[Validators.required]],
     severity:['',[Validators.required]]
   })
   constructor(private formBuilder:FormBuilder, private readonly revisorService: RevisorService, private readonly postService: PostService ){
    this.fetchPosts();
   }
   get name_offender(): AbstractControl {
    return this.logForm.controls['name_offender'];
  }
  get problem(): AbstractControl {
    return this.logForm.controls['problem'];
  }
  get problem_date(): AbstractControl {
    return this.logForm.controls['problem_date'];
  }
  get problem_hour(): AbstractControl {
    return this.logForm.controls['problem_hour'];
  }
  get severity(): AbstractControl {
    return this.logForm.controls['severity'];
  }
   reset() {
    this.logForm.reset();
  }
 

     createForm() {
      if (this.logForm.valid) {
        alert('Valido',);
        const complaintDateValue = this.logForm.value.problem_date;
        const problem_date: Date = complaintDateValue ? new Date(complaintDateValue) : new Date();
        const complaint: Complaint = {
       name_offender: this.logForm.value.name_offender || '',
        problem: this.logForm.value.problem || '',
        problem_date: problem_date,
        problem_hour: this.logForm.value.problem_hour || '',
        severity: this.logForm.value.severity === 'grave'
      };
       this.revisorService.createForm(complaint).subscribe(response => {
        console.log(response);
      });
      this.logForm.reset();
      this.closeModalButton.nativeElement.click();
       
          } else{
            alert('no valido')
         this.logForm.markAllAsTouched();
         } 
    }

    fetchPosts(): void {
      this.postService.findPosts().subscribe(
        (post: PostI[]) => {
          this.post = post;
          console.log(post);
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
    }
}


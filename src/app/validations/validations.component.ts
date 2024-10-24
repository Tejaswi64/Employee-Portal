import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent {
  form: FormGroup;
  showSuccessMessage = false;
  options: string[] = ['Male', 'Female'];
  radioOptions: string[] = ['Coffee', 'Tea'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      inputField: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      selectedOption: ['', [Validators.required]],
      radioOption: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    } else {
      console.error('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);  // Navigate back to the dashboard
  }
}

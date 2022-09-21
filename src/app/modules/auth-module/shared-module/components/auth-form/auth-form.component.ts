import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['aurh-form.component.scss'],
  templateUrl: 'auth-form.component.html'
})
export class AuthFormComponent {
  @Output() submitted = new EventEmitter<any>();

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get isEmailRequired() {
    return (
      this.form.get('email')?.hasError('required')
      && this.form.get('email')?.touched
    );
  }

  get isEmailInvalid() {
    return (
      this.form.get('email')?.hasError('email')
      && this.form.get('email')?.touched
    );
  }

  get isPasswordInvalid() {
    return (
      this.form.get('password')?.hasError('required')
      && this.form.get('password')?.touched
    );
  }

  constructor(
    private fb: FormBuilder
  ) { }

  onSubmit() {
    if (this.form.valid)
      this.submitted.emit(this.form.value);
  }
}

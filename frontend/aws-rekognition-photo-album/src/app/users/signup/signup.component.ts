import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(" ", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(" ", [
        Validators.required,
        Validators.minLength(5)
      ]),
      confirmPassword: new FormControl(" ",
        [Validators.required]
      )
    }, { validators: this.matchPassword });

  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if (password != confirmPassword) { return { 'noMatch': true } }
    return null;
  }

  get email() { return this.signupForm.get('email')!; }

  get password() { return this.signupForm.get('password')!; }

  get confirmPassword() { return this.signupForm.get('confirmPassword')!; }

  onSubmit(): void {
    this.callUserServiceSingUp();
    this.signupForm.reset();
  }

  // doesPassordsMatch(): boolean {
  //   let password = this.signupForm.get('password')?.value
  //   let confirmPassword = this.signupForm.get('confirmPassword')?.value
  //   if (password === confirmPassword) {
  //     return true;
  //   }
  //   else return false;
  // }

  callUserServiceSingUp(): void {
    var newMongoUserJson =
    {
      "email": this.signupForm.get('email'),
      "password": this.signupForm.get('password')
    };
    this.userService.signUp(newMongoUserJson).subscribe(
      res => {
        console.log(res);
      }
    );
  }


}

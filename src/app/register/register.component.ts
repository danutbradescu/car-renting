import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: ''
    });
  }

  validateEmail(email: string): boolean {
    const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|io|co|uk|us|de|fr|it|ro|ca|au|in|jp)$/i;
    return validRegex.test(email);
  }
  
  

  submit(): void {
    let user = this.form.getRawValue();
    console.log(user);

    if (user.name === '' || user.email === '' || user.password === '') {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    }
    else if(!this.validateEmail(user.email)){
      Swal.fire("Error", "Introduceti o adresa de email valida!","error")
    }else {
      this.http.post("http://localhost:5000/api/register", user,{
      withCredentials:true
      })
    .subscribe(() => this.router.navigate(['/']), (err) => {
      Swal.fire("Error", err.error.message, "error")
    })
    }
  }
}

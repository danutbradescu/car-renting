import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  validateEmail(email: string): boolean {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  }

  submit(): void {
    let user = this.form.getRawValue();

    if (user.email === '' || user.password === '') {
      Swal.fire('Error', 'Toate campurile obligatorii!', 'error');

    }else if(!this.validateEmail(user.email)) {
        Swal.fire('Error', 'Introduceti o adresa de email valida!', 'error');
      }
      
      else{ 
      
        this.http.post("http://localhost:5000/api/login", user, {
        withCredentials: true
      })

      .subscribe(
        (res) => this.router.navigate(['/']),
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
      

      }  
  }
}

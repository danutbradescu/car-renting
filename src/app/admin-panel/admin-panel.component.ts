import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CarService } from '../car.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{
  carForm: FormGroup;
  car: any = {}; 

  constructor(private fb: FormBuilder, private carService: CarService) {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      pricePerDay: ['', Validators.required],
      available: [true],
      photoUrl: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.carForm.valid) {
      const formData = new FormData();
      formData.append('make', this.carForm.get('make')!.value); 
      formData.append('model', this.carForm.get('model')!.value); 
      formData.append('year', this.carForm.get('year')!.value); 
      formData.append('color', this.carForm.get('color')!.value); 
      formData.append('pricePerDay', this.carForm.get('pricePerDay')!.value); 
      formData.append('available', this.carForm.get('available')!.value); 
      formData.append('photo', this.carForm.get('photoUrl')!.value); 
  
      this.carService.addCar(formData).subscribe(
        (response) => {
          console.log('Car added successfully', response);
        },
        (error) => {
          console.error('Error adding car', error);
        }
        
    );
    }
    if (this.carForm.valid) {
      const formData = new FormData();
    
      const makeControl = this.carForm.get('make');
      if (makeControl) {
        formData.append('make', makeControl.value);
      }
    
      const modelControl = this.carForm.get('model');
      if (modelControl) {
        formData.append('model', modelControl.value);
      }
    
      // Repeat this pattern for other form controls...
    
      this.carService.addCar(formData).subscribe(
        (response) => {
          console.log('Car added successfully', response);
        },
        (error) => {
          console.error('Error adding car', error);
        }
      );
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.car.photo = file;
  }
}
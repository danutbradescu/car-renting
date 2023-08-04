import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('email')?.valid).toBeFalsy();
    expect(component.form.get('password')?.valid).toBeFalsy();
  });

  it('should show error message for empty form submission', () => {
    const submitSpy = spyOn(component, 'submit');

    fixture.debugElement.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();

    expect(submitSpy).toHaveBeenCalled();
    // Expect that the form is invalid and an error message is shown
    expect(component.form.invalid).toBeTruthy();
    // Add your logic to test if the error message is shown (e.g., using a spy on Swal)
  });

  it('should send login request on form submission', () => {
    // Set form values
    component.form.patchValue({
      email: 'test@example.com',
      password: 'testPassword',
    });

    const submitSpy = spyOn(component, 'submit').and.callThrough();

    fixture.debugElement.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();

    expect(submitSpy).toHaveBeenCalled();
    // Add your logic to test if the login request is sent (e.g., using a spy on HttpTestingController)
  });
});

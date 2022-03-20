import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './interfaces/employee.interface';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // public formNewUser: FormGroup;

  /**
   * List of Employees
   */
  public employees!: Employee[];

  /**
   * Selected Employee in component
   */
  public selectedEmployee!: Employee;

  /**
   * Flag to show modal
   */
  public showAddModal: boolean = false;

  /**
   * Flag to check if editing existing employee
   */
  public edit = false;

  /**
   * Form control for name
   */
  public nameControl = '';

  /**
   * Form control for jobTitle
   */
  public jobTitleControl = '';

  /**
   * Form control for phone
   */
  public phoneControl = '';

  /**
   * Form control for email
   */
  public mailControl = '';

  /**
   * Form control for imageUrl
   */
  public imageUrlControl = '';
  
  constructor(
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  /**
   * Method to load all employees
   */
  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  /**
   * Method to toggle add Employee Modal
   */
  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
    this.toggleEdit();
  }

  toggleEdit() {
    if (this.edit) {
      this.edit = !this.edit;

      this.nameControl = '';
      this.jobTitleControl = '';
      this.mailControl = '';
      this.phoneControl = '';
      this;this.imageUrlControl = '';
    }
  }

  /**
   * Method to save new employee
   */
  addEmployee() {
    const newEmployee: any = {
      id: null,
      employeeCode: null,
      name: this.nameControl,
      jobTitle: this.jobTitleControl,
      email: this.mailControl,
      phone: this.phoneControl,
      imgUrl: this.imageUrlControl,
    };
    console.log(newEmployee);
    if (!this.edit) {
      this.employeeService.saveEmployee(newEmployee).subscribe(
        (response: Employee) => {
          this.toggleAddModal();
          this.getEmployees();
          window.alert('New employee saved soccessfully')
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      )
    } else {
      newEmployee.id = this.selectedEmployee.id;
      newEmployee.employeeCode = this.selectedEmployee.employeeCode;
      this.employeeService.updateEmployee(newEmployee).subscribe(
        (response: Employee) => {
          this.getEmployees();
          this.toggleAddModal();
          window.alert(`Data updated for ${response.name}`);
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      )
    }
  }

  /**
   * Method to edit employee
   */
  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.toggleAddModal();
    this.edit = true;
    this.nameControl = employee.name;
    this.jobTitleControl = employee.jobTitle;
    this.mailControl = employee.email;
    this.phoneControl = employee.phone;
    this.imageUrlControl = employee.imgUrl;
  }

  /**
   * Method to edit employee
   */
  deleteEmployee(employee: Employee) {
    const id = employee.id;
    this.employeeService.deleteEmployee(id).toPromise().then(() => {
      this.getEmployees();
    });
  }
}

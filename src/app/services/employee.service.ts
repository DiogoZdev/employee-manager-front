import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../interfaces/employee.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private api = environment.employeeAPI;

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Method to get all employees from database
   * @returns Observable of a list of all employees
   */
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/get-all`);
  }

  /**
   * Method to get a specific employee from it's ID
   * @param id Employee ID
   * @returns Observable of pecific employee found
   */
  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}/find/${id}`);
  }

  /**
   * Method to save new employee
   * @param employee New Employee
   * @returns Observable of new employee saved
   */
  public saveEmployee(employee: Employee): Observable<Employee> {
    console.log('salvando');
    
    return this.http.post<Employee>(`${this.api}/add`, employee);
  }

  /**
   * Method to updated an exising employee
   * @param employee Employee to be updated
   * @returns Observable of updated employee
   */
  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/update`, employee);
  }

  /**
   * Method to delete a specific employee
   * @param id Employee's ID to be deleted
   */
  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/delete/${id}`);
  }
}
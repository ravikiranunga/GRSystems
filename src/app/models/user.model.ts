export interface User
{
  id:number;
  type: number;
  name:string;
  email:string;
  empId:string;
  userName:string;
  
  password: string;
  createdDate: string;
  openTickets:number;
  totalTickets:number;
  closedTickets:number;

  employeeId:string;

  employee_Name:string;
  phoneNumber:string;
  category:string;
  department:string;
}
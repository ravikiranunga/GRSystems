export interface Category
{
  deptId:string,
  name: string;
  Description: string;

  description: string;
  createdOn: Date;
  openTickets:number,
  totalTickets:number,
  closedTickets:number,
  L1_Escalation_User:string;
  L2_Escalation_User:string;
  L3_Escalation_User:string;
  L1_Duration_In_Hours:number;
  L2_Duration_In_Hours:number;
  L3_Duration_In_Hours:number;
}
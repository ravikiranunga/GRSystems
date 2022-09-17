import { Component, OnInit} from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Category } from 'src/app/models/category.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs';
import { Ticket } from 'src/app/models/ticket.model';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  
  dateSelected:Date;
  categoryList: Category[];
  statusList: string[];
  priorityList: string[];
  selectedCategory: Category;
  categories: Category[];
  selectedTicket: Ticket;
  ticketsLoaded: boolean = false;
  tickets: Ticket[];
  exportEnable:boolean=true;

  filteredTickets:Ticket[];
  catTicket:Ticket[];
  statTicket:Ticket[];
  priTicket:Ticket[];

  categorySelected: string ="All";
  statusSelected: string="All";
  prioritySelcted: string="All";
  constructor(private Calander: NgbCalendar, private dataService: DataService, private apiservice: ApiServiceService) {


    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
  }

  ngOnInit(): void {
    this.GetAllDepartments();
    this.GetTicketsbyFilterss();
  }
  resetForm(form: NgForm) {
    form.form.reset();
  } 
  onSubmit() {
    var categorySelected =this.categorySelected;
    var statusSelected=this.statusSelected;
    var prioritySelcted=this.prioritySelcted;
    this.filteredTickets = this.tickets.filter((ticket:any) => {

      return ((ticket.department == categorySelected  ||  categorySelected =="All") 
      && (ticket.status == statusSelected  ||  statusSelected =="All") 
      && (ticket.priority == prioritySelcted || prioritySelcted == "All")
      ); 
    })
    //this.GetTicketsbyFilters();
    
    this.ticketsLoaded = this.filteredTickets.length>0?true:false;
    this.exportEnable = false;
  }

  

  categoryChange(value: string) {
    this.catTicket = this.tickets.filter((ticket:any)=>{
      return ticket.department == this.categorySelected;
    })

    this.categorySelected = value;
    console.log(value);
  }

  statusChanged(value: string) {
    this.statTicket = this.tickets.filter((ticket:any)=>{
      ticket.status == this.statusSelected;
    })    
    this.statusSelected = value;
    console.log(value);
  }
  prorityClicked(value: string) {
    this.priTicket = this.tickets.filter((ticket:any)=>{
      ticket.priority == this.prioritySelcted
    })
    this.prioritySelcted = value;
    console.log(value);
  }
  getSelectedRowData(category: Category) {
    this.selectedCategory = category;
  }
  GetAllDepartments() {
    this.apiservice.GetAllDepartments().pipe(finalize(() => { })).subscribe((response: any) => {
      this.categories = response;
      this.filteredTickets = response;
    });
  }

  getSelectedData(ticket: Ticket) {
    console.log(ticket.number);
    this.selectedTicket = ticket;
  }
  GetTicketsbyFilterss() {
    this.apiservice.GetTicketsByFilters().pipe(finalize(() => { })).subscribe((response: any) => {
      this.tickets = response;
      
      // console.log(this.tickets);
      this.filteredTickets= this.tickets;  
    });
  }

  exportClicked(){
    var csvData = this.ConvertToCSV( this.filteredTickets);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    var x:Date = new Date();
    var link:string ="filename_" + x.getMonth() +  "/" +  x.getDay() + '.csv';
    a.download = link.toLocaleLowerCase();
    a.click();
  }  
  ConvertToCSV(objArray:any[]) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {3
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }
}

import { Component, OnInit } from '@angular/core';
import { top, bottom, right } from '@popperjs/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Ticket } from 'src/app/models/ticket.model';
import { DataService } from 'src/app/services/data.service';
import { filter, finalize, Observable } from 'rxjs';

import{Category} from 'src/app/models/category.model';

import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component(
{
  selector: 'app-sadmin-dash',
  templateUrl: './sadmin-dash.component.html',
  styleUrls: ['./sadmin-dash.component.scss']
})
export class SadminDashComponent implements OnInit
{
    ticketsList:Ticket[];
    totalTicketsCount:number;  

    closetick:Ticket[];
    closedTicketsCount:number;
    
    opentick:Ticket[];
    openTicketsCount:number;  

    pendtick:Ticket[];
    pendingTicketCount:number;

    lowCount:number;
    mediumCount:number;

    highCount:number;
    ticketlowCount:Ticket[];

    ticketmediumCount:Ticket[];
    tickethighCount:Ticket[];

    products : any =[];
    TotalTicket:Ticket[];
    AllTickets:Ticket[];
    Category: any =[];

    categories:Category[];
    
  constructor(private dataService:DataService,private apiservice: ApiServiceService,
    private httpsClient:HttpClient)
  {
    
  }

  ngOnInit(): void
  {
    //API CALL
    this.GetRecentTickets();
    this.GetAllTickets();
    this.GetAllDepartments();
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }

  BindChartData(categoriesdata:any){
    var xValue =[];
    var yValues1 = [];
    var yValues2 = [];
    var yValues3 = [];
    const ar = Object.values(categoriesdata);
    console.log(ar);

    for(var cat in categoriesdata){
      xValue.push(categoriesdata[cat].name);
      yValues1.push(categoriesdata[cat].totalTickets);
      yValues2.push(categoriesdata[cat].openTickets);
      yValues3.push(categoriesdata[cat].closedTickets);
    }
   
    var xValues = xValue;    
    var barColors = ["#0d6efd", "#198754","#ffc107"];
    const chart3 = new Chart("chart3",
    {
        type: "bar",
        data:
        {
          labels: xValues,
          datasets:
          [
            {
              backgroundColor: barColors,
              data: yValues1
            },
            {
              backgroundColor: barColors,
              data: yValues2
            },
            {
              backgroundColor: barColors,
              data: yValues3
            },
          ]
        },
        
        options:
        {
            responsive: true,
            maintainAspectRatio : false,
            plugins:{legend:{display:false, labels:{boxWidth:50}}, datalabels: {color: 'white', font:{weight:'bold', size:15}, display: true}},
        }
    });
  }

  TicketByStatus()
  {
    const chart1 = new Chart("chart1",
    {
        type: 'doughnut',        
        data: {
            labels: ['Open', 'In Progress', 'Closed'],
            datasets: [{
                label: 'Tickets',                
                data: [this.openTicketsCount, this.pendingTicketCount, this.closedTicketsCount],
                backgroundColor:
                [
                    '#0d6efd',
                    '#ffc107',
                    '#198754',
                ],
                borderWidth: 0,
                datalabels:{anchor:'center'}
            }]
        },
        
        options:
        {
            cutout:'60%',
            radius:'80%',
            responsive: true,
            maintainAspectRatio : false,
            plugins:{legend:{position:right, labels:{boxWidth:50}}, datalabels: {color: 'white', font:{weight:'bold', size:15}, display: true}},
        }
    });
  }
 TicketByPriority(){
  const chart2 = new Chart("chart2",
    {
        type: 'doughnut',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                label: 'Tickets',
                data: [this.lowCount, this.mediumCount, this.highCount],
                backgroundColor:
                [
                  '#dc3545',
                  '#ffc107',
                  '#198754',
                ],
                borderWidth: 0,
                datalabels:{anchor:'center'}
            }]
        },
        
        options:
        {
            cutout:'60%',
            radius:'80%',
            responsive: true,
            maintainAspectRatio : false,
            plugins:{legend:{position:right, labels:{boxWidth:50}}, datalabels: {color: 'white', font:{weight:'bold', size:15}, display: true}},
        }
    });
 }
  GetRecentTickets(){  
    this.apiservice.GetRecentTickets().pipe(finalize(()=> {})).subscribe((response: any)=>{
      this.ticketsList = response;
    });   
  }   
  GetAllTickets(){   
    this.apiservice.GetAllTickets().subscribe((response: any)=>{
      this.totalTicketsCount = response.length;
      this.AllTickets=response;
      console.log(this.totalTicketsCount);
     
      this.closetick = response.filter((x:any)=> x.status === 'Closed')
      this.closedTicketsCount= this.closetick.length; 
      

      this.opentick = response.filter((x:any)=> x.status === 'Pending at admin')
      this.openTicketsCount= this.opentick.length; 

      this.pendtick = response.filter((x:any)=> x.status === 'Pending at Super Admin')
      this.pendingTicketCount= this.pendtick.length;
      
      this.ticketlowCount = response.filter((x:any)=> x.priority === 'Low-Priority')
      this.lowCount = this.ticketlowCount.length;

      this.ticketmediumCount = response.filter((x:any)=> x.priority === 'Medium-Priority')
      this.mediumCount = this.ticketmediumCount.length;

      this.tickethighCount = response.filter((x:any)=> x.priority === 'High-Priority')
      this.highCount = this.tickethighCount.length;

      this.TicketByStatus();
      this.TicketByPriority();
    });
  }
  GetAllDepartments() {
    this.apiservice.GetAllDepartments().pipe(finalize(()=>{})).subscribe((response: any)=>{
      this.categories = response;
      this.BindChartData(this.categories);
      console.log(this.categories);
    });
  }
}



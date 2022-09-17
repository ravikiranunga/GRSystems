import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { top } from '@popperjs/core';
import { CategoryNewComponent } from '../category-new/category-new.component';
import { Ticket } from 'src/app/models/ticket.model';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs';


@Component(
  {
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
  })
export class CategoryListComponent implements OnInit {
  @ViewChild('ticketTable') table: ElementRef;

  categories: Category[];
  changes: any;
  selectedCategory: Category;
  tickets:Ticket[];
  public chart1: Chart;


  constructor(private dataService: DataService, private modalService: NgbModal, private apiservice: ApiServiceService) {
    this.categories = dataService.CATEGORY_DATA;
    this.changes = dataService.CHANGE_DATA;
  }

  ngOnInit(): void {

//api call
    this.GetAllDepartments();
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
    this.getChart();
  }

  
  getSelectedRowData(category: Category) {
    if (this.chart1) this.chart1.destroy();
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    this.getChart();
  }

  getChart(){
    this.chart1 = new Chart("chart1",
      {
        type: 'doughnut',
        data: {
          labels: ['Open', 'In Progress', 'Closed'],
          datasets: [{
            label: 'Tickets',
            data: [this.selectedCategory.openTickets,this.selectedCategory.totalTickets, this.selectedCategory.closedTickets ],
            backgroundColor:
              [
                '#0d6efd',
                '#ffc107',
                '#198754',
              ],
            borderWidth: 0,
            datalabels: { anchor: 'center' }
          }]
        },

        options:
        {
          cutout: '60%',
          radius: '80%',
          maintainAspectRatio: false,
          plugins: { legend: { position: top, labels: { boxWidth: 10 } }, datalabels: { color: 'white', font: { weight: 'bold', size: 15 }, display: true } },
        }
      });

  }
  createCategory() {
    const dialog = this.modalService.open(CategoryNewComponent);
  }
  GetAllDepartments() {
    this.apiservice.GetAllDepartments().pipe(finalize(()=>{})).subscribe((response: any)=>{
      this.categories = response;
      console.log(this.categories);
      this.selectedCategory = response[1];
    });
  }

  GetAllTickets(){    
    this.apiservice.GetAllTickets().subscribe((response: any)=>{
      this.tickets = response;
      console.log(this.tickets);
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-lime',
  templateUrl: './lime.component.html',
  styleUrls: ['./lime.component.css']
})
export class LimeComponent implements OnInit {

  public chart:Chart | undefined;
  
  constructor() { }

  ngOnInit(): void {
    console.log(document.getElementById("lime-container")?.getBoundingClientRect());
    this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [-10, 10, -5, 2, 20, 30, 45]
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive:true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}

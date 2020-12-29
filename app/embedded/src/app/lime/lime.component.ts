import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-lime',
  templateUrl: './lime.component.html',
  styleUrls: ['./lime.component.css']
})
export class LimeComponent implements OnInit {

  public chart:Chart | undefined;
  
  constructor(private http:HttpClient) { }
  async ngOnInit()  {
    let features = await this.http.get("../lime").toPromise();
    console.log(features);
    let maximum = Object.values(features).map((n:number) => Math.abs(n)).reduce((a,b)=>Math.max(a,b));
    let minimum = Object.values(features).reduce((a,b)=>Math.min(a,b));
    maximum = maximum + maximum/10;
    console.log(maximum)
    this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
        labels: Object.keys(features),
        datasets: [{
            label: 'My First dataset',
            backgroundColor: Object.values(features).map((n:number) => {
              if(n >0)return "blue"
              else return "red"
            }),
            borderColor: 'rgb(255, 99, 132)',
            data: Object.values(features)
        }]
      },
      options: {
        
        maintainAspectRatio: false,
        //responsive:true,
        legend: {
          display: false
        },
        scales: {
          xAxes : [{
            ticks : {
            max : maximum,    
            min : - (Math.abs(minimum) + maximum)/3 ,
            autoSkip:true

          },gridLines: {
            display: true,
            lineWidth: 0,
            zeroLineColor:'black',
            zeroLineWidth:3
          }
        }]
        }
      }
    });
    console.log(this.chart);
  }

/*async ngOnInit()  {
  let features = await this.http.get("../lime").toPromise();
  console.log(features);
  let maximum = Object.values(features).map((n:number) => Math.abs(n)).reduce((a,b)=>Math.max(a,b));
  console.log(maximum)
  this.data = Object.entries(features).map((k:any,v:any) => {return {name:k,value:v}});
  console.log(this.data);
}
  public data:any[] = [];
  // options
  public showXAxis: boolean = true;
  public  showYAxis: boolean = true;
  public  gradient: boolean = false;
  public  showLegend: boolean = true;
  public  showXAxisLabel: boolean = true;
  public yAxisLabel: string = 'Feature';
  public showYAxisLabel: boolean = true;
  public xAxisLabel: string = 'Importance';

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private http:HttpClient) {
    
  }*/

  /*ngOnInit(): void {
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
  }*/

}

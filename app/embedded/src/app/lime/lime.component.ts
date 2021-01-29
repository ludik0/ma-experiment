import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-lime',
  templateUrl: './lime.component.html',
  styleUrls: ['./lime.component.css']
})
export class LimeComponent implements OnInit {

  public chart:Chart | undefined;
  /*public formGroup = new FormGroup({
    sl: new FormControl('', [
        Validators.required,
    ]),
    sw: new FormControl('', [
      Validators.required,
    ]),
    pl: new FormControl('', [
      Validators.required,
    ]),
    pw: new FormControl('', [
      Validators.required,
    ]),
  });*/
  private translations:any = {
    "age":"Alter",
    "priors_count":"Bisherige Straftaten",
    "two_year_recid":"Rückfall in den letzen 2 Jahren",
    "race":"Ethnische Herkunft"
  }
  constructor(private http:HttpClient) { }
  async ngOnInit()  {
    let features = await this.http.get("../lime").toPromise();
    console.log(features);
    let translated_features:any = {};
    Object.entries(features).forEach((entry:any) => {
      for(let [k,val] of Object.entries(this.translations)){
        if(entry[0].indexOf(k)>=0){
          var newkey = entry[0].replace(k,val);
          translated_features[newkey] = entry[1]
        }
      }
      //translated_features[entry[0]] = v;
    })
    this.showExpanation(translated_features);
    
    console.log(this.chart);
    //let featuresValues = await this.http.get<any>("../lime/sample").toPromise();
    /*this.formGroup.controls["sl"].patchValue(featuresValues["sepal length (cm)"]);
    this.formGroup.controls["sw"].patchValue(featuresValues["sepal width (cm)"]);
    this.formGroup.controls["pl"].patchValue(featuresValues["petal length (cm)"]);
    this.formGroup.controls["pw"].patchValue(featuresValues["petal width (cm)"]);*/
  }
  /*public submit():void{
    console.log(this.formGroup.value)
    this.http.post<any>("../lime",this.formGroup.value).subscribe(newExplanation =>{
      this.showExpanation(newExplanation);
    });
  }*/
  showExpanation(features:any):void{
    let maximum = Object.values(features).map((n:any) => Math.abs(n)).reduce((a,b)=>Math.max(a,b));
    let minimum = Object.values(features).reduce((a:any,b:any)=>Math.min(a,b));
    maximum = maximum + maximum/10;
    this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
        labels: Object.keys(features),
        datasets: [{
            label: 'My First dataset',
            backgroundColor: Object.values(features).map((n:any) => {
              if(n >0)return "#6391db"
              else return "#f27146"
            }),
            borderColor: 'black',
            data: <any>Object.values(features)
        }]
      },
      options: {
        
        maintainAspectRatio: false,
        //responsive:true,
        legend: {
          display: false
        },
        scales: {
          xAxes : [
            {
              ticks : 
              {
                max : maximum,    
                min : -maximum,// (Math.abs(minimum) + maximum)/3 ,
                autoSkip:true
              }
              ,gridLines: 
              {
                display: true,
                lineWidth: .5,
                zeroLineColor:'black',
                zeroLineWidth:3
              }
            }
          ],
          yAxes : [
            {
              display:false
            }
          ]
      },
        animation: {
          onComplete: function () {
            var ctx = (<any>this).chart.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';

            (<any>this).data.datasets.forEach(function (dataset:any) {
              for (var i = 0; i < dataset.data.length; i++) {
                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                    left = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._xScale.left;
                ctx.fillStyle = '#444'; // label color
                var label = model.label;
                ctx.fillText(label, left + 15, model.y + 8);
              }
            });               
          }
        }
        
      }
    });
  }
}

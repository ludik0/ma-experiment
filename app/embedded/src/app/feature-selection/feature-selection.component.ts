import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-selection',
  templateUrl: './feature-selection.component.html',
  styleUrls: ['./feature-selection.component.css']
})
export class FeatureSelectionComponent implements OnInit {
  public features:any[]=[
    {name:"Alter"                                       ,internalName:"age"                     ,active:true},
    {name:"Alters Kategorie"                            ,internalName:"age_cat"                 ,active:true},
    {name:"Geschlecht"                                  ,internalName:"sex"                     ,active:true},
    {name:"Ethnische Herkunft"                          ,internalName:"race"                    ,active:true},
    {name:"Anzahl der Straftaten"                       ,internalName:"priors_count"            ,active:true},
    //{name:"Zeit seit dem letzten positiven Drogentests" ,internalName:"days_b_screening_arrest" ,active:true},
    {name:"Schwere der Straftat"                        ,internalName:"c_charge_degree"         ,active:true},
    {name:"Bereits rückfällig geworden"                 ,internalName:"is_recid"                ,active:true},
    {name:"Bereits gewaltätig rückfallig geworden"      ,internalName:"is_violent_recid"        ,active:true},
    {name:"In den letzten 2 Jahren rückfällig geworden" ,internalName:"two_year_recid"          ,active:true},
    {name:"Länge des Gefängnisaufenthalts"              ,internalName:"length_of_stay"          ,active:true},
  ];
  public result_translation:any = {
    "High": "Hohe Rückfall-Wahrscheinlichkeit",
    "Medium": "Mittlere Rückfall-Wahrscheinlichkeit",
    "Low": "Geringe Rückfall-Wahrscheinlichkeit"
  }
  public result:string = "";
  public isloading:boolean = false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  public toggleFeature(feature:any){
    this.features.filter(f => f.name == feature.name).forEach(f => f.active = !f.active);
  }
  public async updateResult(){
    if(this.features.filter(f => f.active == true).length < 2){
      return alert("Bitte mindestens 2 Attribute auswählen.");
    }
    this.isloading = true;
    let activeFeatures =  this.features.filter(f=> f.active == true);
    let response = await this.http.post<any>("../fs",activeFeatures).toPromise();
    this.result = this.result_translation[response.result];
    void (<HTMLElement>document.getElementById("result-box")).offsetWidth;
    
    (<HTMLElement>document.getElementById("result-box")).classList.add("result-box");
    setTimeout(()=>{
      (<HTMLElement>document.getElementById("result-box")).classList.remove("result-box");
    },1200);
    this.isloading = false;
  }
}

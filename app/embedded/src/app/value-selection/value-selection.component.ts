import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-value-selection',
  templateUrl: './value-selection.component.html',
  styleUrls: ['./value-selection.component.css']
})
export class ValueSelectionComponent implements OnInit {
  //age cat, race, sex, rückfällig
  public features:any={
    "sex":{
      name:"Geschlecht",
      mapping:{
        "Männlich":"Male",
        "Weiblich":"Female"
      },
      default:"Male"
    },
    "age_cat":{
      name:"Alters Kategorie" ,
      mapping:{
        "Älter als 45":"Greater than 45",
        "25-45":"25-45",
        "Jünger als 25":"Less than 25"
      },
      default:"25-45"
    },
    "race":{
      name:"Ethnische Herkunft",
      mapping:{
        "Europäisch":"Caucasian",
        "Afroamerikaner":"African-American",
        "Asiatisch":"Asian",
        "Latino":"Hispanic",
        "Amerikanischer Ureinwohner":"Native American",
        "Weitere":"Other"
      },
      default:"African-American"
    },
    "is_recid":{
      name:"Bereits rückfällig geworden"   ,
      mapping:{
        "Ja":1,
        "Nein":0
      },
      default:1
    }
  };
  public result_translation:any = {
    "High": "Hohe Rückfall-Wahrscheinlichkeit",
    "Medium": "Mittlere Rückfall-Wahrscheinlichkeit",
    "Low": "Geringe Rückfall-Wahrscheinlichkeit"
  }
  public result:string = "";
  public isloading:boolean = false;
  public formGroup = new FormGroup({
    sex: new FormControl('', [
        Validators.required,
    ]),
    race: new FormControl('', [
      Validators.required,
    ]),
    is_recid: new FormControl('', [
      Validators.required,
    ]),
    age_cat: new FormControl('', [
      Validators.required,
    ]),
  });
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.formGroup.patchValue({
      is_recid: this.features["is_recid"].default, 
      sex: this.features["sex"].default, 
      race: this.features["race"].default, 
      age_cat: this.features["age_cat"].default, 
    });
  }
  public async submit():Promise<void>{
    this.isloading = true;
    console.log(this.formGroup.value)
    let response = await this.http.post<any>("../vs",this.formGroup.value).toPromise();
    console.log(response)
    this.result = this.result_translation[response.result];
    void (<HTMLElement>document.getElementById("result-box")).offsetWidth;
    
    (<HTMLElement>document.getElementById("result-box")).classList.add("result-box");
    setTimeout(()=>{
      (<HTMLElement>document.getElementById("result-box")).classList.remove("result-box");
    },1200);
    this.isloading = false;
  }

}

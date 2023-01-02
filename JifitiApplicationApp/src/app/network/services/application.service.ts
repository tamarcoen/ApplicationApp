import { Injectable } from '@angular/core';
import { Application } from '../model/application';
import { BehaviorSubject, map, Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationList:Application[] |undefined;

  constructor(private http: HttpClient) { }

  getDataListApplication(): Observable<Application[]> {
    if(this.applicationList)
    return of(this.applicationList);
     
    return this.http.get<Application[]>(environment.Url+`Application/GetApplications`).pipe(map((appList:Application[])=>{
     this.applicationList=appList;
     return appList;
     }));
    
  }
  
  getApplicationDetails(id:number){
    return this.applicationList?.filter(x=>x.id==id)[0];
  }
}

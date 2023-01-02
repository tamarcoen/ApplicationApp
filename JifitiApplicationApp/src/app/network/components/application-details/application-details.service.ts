import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../../model/card';
import { Trans } from '../../model/trans';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailsService {

  constructor(private http: HttpClient) { }

getCards = (appId: number) :Observable<Card[]> =>{
    let Param = new HttpParams().set('appId', appId);
    return this.http.get<Card[]>(environment.Url+`Application/GetCards`,{ params: Param });
}

getTrans = (appId: string) :Observable<Trans[]> =>{
    let Param = new HttpParams().set('appId', appId);
    return this.http.get<Trans[]>(environment.Url+`Application/GetTrans`,{ params: Param });
}
}

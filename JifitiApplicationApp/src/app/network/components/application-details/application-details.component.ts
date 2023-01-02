import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Application } from '../../model/application';
import { ApplicationDetails } from '../../model/application-details';
import { Card } from '../../model/card';
import { Trans } from '../../model/trans';
import { TransType } from '../../model/TransType.enum';
import { ApplicationService } from '../../services/application.service';
import { ApplicationDetailsService } from './application-details.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  constructor(private _router: Router,private _appDetails:ApplicationDetailsService,private _applicatinServ:ApplicationService,private cdr: ChangeDetectorRef,private activatedRoute: ActivatedRoute)  { }

  selectedAppRow:Application|undefined;
  displayedColumns: string[] = ['cardNo', 'issuer', 'amount' ,'transType'];
  tranTypeEnum = TransType;
  isLoading:boolean=true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applicationDetailsList = new MatTableDataSource<ApplicationDetails>();


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.selectedAppRow=this._applicatinServ.getApplicationDetails(params['id']);
      this.getData(this.selectedAppRow);
    });
  }
  
  getData(selectedRow:any){
    let c = this._appDetails.getCards(selectedRow.id);
    let t = this._appDetails.getTrans(selectedRow.id);

    return forkJoin([c, t]).subscribe(res=>{
        let cards = res[0] as Card[];
        let trans = res[1] as Trans[];
        let resAppDetails=trans.map(t=>({...t, ...cards
          .find(c => c.id === t.cardId)}));

          this.applicationDetailsList.data=resAppDetails as ApplicationDetails[];
          this.cdr.detectChanges();

          this.applicationDetailsList.paginator=this.paginator;
          this.applicationDetailsList.sort=this.sort;

          this.isLoading=false;
      })
   }

  backToApp(){
    this._router.navigate(['/application']);
  }
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Application } from '../../model/application';
import { ApplicationService } from '../../services/application.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{

@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;

subscription!: Subscription;
isLoading:boolean=true;
applicationList = new MatTableDataSource<Application>();
displayedColumns: string[] = ['id', 'firstName', 'lastName'];

constructor(private _applicatinServ:ApplicationService,private router: Router) { }

 ngOnInit(): void {
  
  this.subscription=this._applicatinServ.getDataListApplication().subscribe((res:Application[]) => {
    this.applicationList.data=res; 
  });
}
 ngAfterViewInit() :void {
  this.applicationList.sort = this.sort;
  this.applicationList.paginator = this.paginator;
 }

 ngOnDestroy():void {    
  this.subscription.unsubscribe();
}

 getRowData(row:any){
   this.router.navigate(['/appDetails',row.id]);
 }
}

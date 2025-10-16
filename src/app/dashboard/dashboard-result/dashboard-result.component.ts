import { Component, OnInit } from '@angular/core';
import { CardInfoResultDashboardComponent } from './card-info-result-dashboard/card-info-result-dashboard.component';
import { GraphicDayQualidComponent } from './graphic-day-qualid/graphic-day-qualid.component';
import { TableQualidComponent } from './table-qualid/table-qualid.component';

@Component({
  standalone: true,
  imports: [CardInfoResultDashboardComponent, GraphicDayQualidComponent, TableQualidComponent],
  selector: 'app-dashboard-result',
  templateUrl: './dashboard-result.component.html',
  styleUrls: ['./dashboard-result.component.css']
})
export class DashboardResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

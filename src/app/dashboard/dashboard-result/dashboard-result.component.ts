import { Component, OnInit } from '@angular/core';
import { CardInfoResultDashboardComponent } from './card-info-result-dashboard/card-info-result-dashboard.component';

@Component({
  standalone: true,
  imports: [CardInfoResultDashboardComponent],
  selector: 'app-dashboard-result',
  templateUrl: './dashboard-result.component.html',
  styleUrls: ['./dashboard-result.component.css']
})
export class DashboardResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

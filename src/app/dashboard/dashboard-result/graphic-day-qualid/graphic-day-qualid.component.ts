import { Component, Input, OnInit } from '@angular/core';
import { GraphicBarComponent } from "../../../utils/graphic-bar/graphic-bar.component";

@Component({
  standalone: true,
  imports: [GraphicBarComponent],
  selector: 'app-graphic-day-qualid',
  templateUrl: './graphic-day-qualid.component.html',
  styleUrls: ['./graphic-day-qualid.component.css']
})
export class GraphicDayQualidComponent implements OnInit {

  @Input() public fistName: string = 'Outubro';
  @Input() public fistData: any[] = [{ categoria: 'Outubro', valor: 50 }];
  @Input() public fistCor: string = '#A642F4';

  ngOnInit() {
  }

}

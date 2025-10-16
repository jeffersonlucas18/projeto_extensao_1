import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import Highcharts, { Options } from 'highcharts';
import { HighchartsChartComponent, ChartConstructorType, HighchartsChartDirective } from 'highcharts-angular';
import { Unsubscribable } from 'rxjs';

@Component({
  standalone: true,
  imports: [HighchartsChartComponent, HighchartsChartDirective],
  selector: 'app-graphic-bar',
  templateUrl: './graphic-bar.component.html',
  styleUrls: ['./graphic-bar.component.css']
})
export class GraphicBarComponent implements OnInit, OnDestroy {

  @Input() title!: string;
  @Input() nameFile: string = 'Grafico-Red';
  @Input() size!: string;
  @Input() yMin!: number;
  @Input() yMax!: number;
  @Input() toFixed: number = 1;
  @Input() format: string = '';
  @Input() numberSize: number = 0.7;
  @Input() marginBootomNumber: number = -7;
  @Input() numberRotation: number = -40;
  @Input() legend: boolean = true;
  @Input() export: boolean = true;
  // @Input() isType: boolean = false;

  @Input() fistName: string = 'Mês atual';
  @Input() fistData: any[] = [{ categoria: 'mes', valor: 10 }, { categoria: 'mes 2', valor: 20 }];
  @Input() fistCor: string = '#FF7043';

  @Input() secoundName!: string | null;
  @Input() secoundData!: any[];
  @Input() secoundCor: string | null = '#E0E0E0';

  @Input() threeName!: string;
  @Input() threeData!: any[];
  @Input() threeCor: string = '#BDBDBD';

  @Input() fourName!: string;
  @Input() fourData!: any[];
  @Input() fourCor: string = '#BDBDBD';

  public options!: Options;
  public chart = Highcharts;
  public unsubscribe!: Unsubscribable;
  public reloadEvent: boolean = true;
  public loading: boolean = false;

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.threeData?.length == 0) {
      this.threeData = [];
    }
    this.options = this._criarGrafico();
    this._registrarNavbarEvent();
  }


  private _registrarNavbarEvent(): void {

  }


  private _criarGrafico(): Options {
    const categorias = this.fistData?.map(p => p.categoria);
    const primeirosValores = this.fistData?.map(p => p.valor);
    const segundosValores = this.secoundData ? this.secoundData.map(p => p.valor) : null;
    const terceiroValores = this.threeData ? this.threeData.map(p => p.valor) : null;
    const quartoValores = this.fourData ? this.fourData.map(p => p.valor) : null;
    const self = this;
    let series: any[];

    if (quartoValores) {
      series = [
        { name: this.fistName, data: primeirosValores, y: primeirosValores, maxPointWidth: 50, groupPadding: 0.1 },
        { name: this.secoundName, data: segundosValores, y: segundosValores, maxPointWidth: 50, groupPadding: 0.1 },
        { name: this.threeName, data: terceiroValores, y: terceiroValores, maxPointWidth: 50, groupPadding: 0.1 },
        { name: this.fourName, data: quartoValores, y: quartoValores, maxPointWidth: 50, groupPadding: 0.1 }
      ]
    } else if (terceiroValores) {
      series = [
        { name: this.fistName, data: primeirosValores, y: primeirosValores, maxPointWidth: 50, groupPadding: 0.1 },
        { name: this.secoundName, data: segundosValores, y: segundosValores, maxPointWidth: 50, groupPadding: 0.1 },
        { name: this.threeName, data: terceiroValores, y: terceiroValores, maxPointWidth: 50, groupPadding: 0.1 }
      ]
    } else if (segundosValores) {
      series = [
        { name: this.fistName, data: primeirosValores, y: primeirosValores, maxPointWidth: 50, groupPadding: 0.1 },
        { name: this.secoundName, data: segundosValores, y: segundosValores, maxPointWidth: 50, groupPadding: 0.1 }
      ]
    } else {
      series = [
        { name: this.fistName, data: primeirosValores, y: primeirosValores, maxPointWidth: 50, x: primeirosValores },
      ]
    }

    let notaPilarOptions: Options = {
      chart: {
        type: 'column',
        height: this.size,
        ignoreHiddenSeries: true,
        marginTop: 60,

      },

      // @ts-ignore
      yAxis: {
        title: {
          // @ts-ignore
          enabled: false,
        },
        min: this.yMin,
        max: this.yMax
      },
      title: {
        text: this.title,
        align: 'left',
      },
      colors: [
        this.fistCor ?? '#FF7043',
        this.secoundCor ?? '#E0E0E0',
        this.threeCor ?? '#BDBDBD',
        this.fourCor ?? '#BDBDBD'
      ],
      credits: {
        enabled: false
      },
      series: series,
      plotOptions: {
        column: {
          borderRadius: 5
        },
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            // format: this.casaDecimal ? `{point.y:.${this.casaDecimal}f}${this.formatacao}` : `{point.y}${this.formatacao}`,
            formatter: function () {
              return Highcharts.numberFormat(this.y ?? 0, self.toFixed, ',', '.');
            },
            rotation: this.numberRotation,
            style: { fontSize: `${this.numberSize}rem` },
            y: this.marginBootomNumber,

          },
          point: {
            events: {
              click: function (e) {

              }
            },
          },

        }
      },
      legend: {
        enabled: this.legend,
        alignColumns: true,
        itemStyle: { fontSize: '15px', fontWeight: 'none' }
      },
      exporting: {
        sourceWidth: 1600,
        filename: this.nameFile,
        enabled: this.export,
        menuItemDefinitions: {
          "viewFullscreen": { text: 'Visualizar em tela cheia' }, "separator": {}, "downloadPNG": { text: 'Exportar em PNG' }, "downloadJPEG": { text: 'Exportar em JPEG' }, "downloadPDF": { text: 'Exportar em PDF' }, "label": {
            text: 'Exportar em XLSX', onclick: function () {
              // self.reportXlsx.emit(true)
            }
          }
        },
        buttons: {
          contextButton: {
            menuItems: ["viewFullscreen", "separator", "downloadPNG", "downloadJPEG", "downloadPDF"]
          }
        }
      },
      xAxis: {
        categories: categorias,
        crosshair: true,
        lineColor: '#e6e6e6'
      },
    };
    return notaPilarOptions;
  }

}

import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  public barChartType: ChartType = 'bar';

  // Aquí antes tenías las labels aparte, ahora todo va en barChartData 👇
  public barChartData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        data: [5, 10, 8, 12, 7, 9, 6],
        label: 'Ahorro Diario',
        backgroundColor: '#007aff'
      }
    ]
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}

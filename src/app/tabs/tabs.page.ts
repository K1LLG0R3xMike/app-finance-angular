import { Component } from '@angular/core';
import { statsChartOutline, trophyOutline, listOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  statsChartOutline = statsChartOutline;
  trophyOutline = trophyOutline;
  listOutline = listOutline;

  constructor() {}

}

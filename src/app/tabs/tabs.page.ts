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


  onTabChange() {
    // Desenfoca cualquier elemento antes de que la pestaña cambie
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl) {
      activeEl.blur();
    }
  }
  
}

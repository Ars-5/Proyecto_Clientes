import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudrfb';
  showLogin = true;
  isSideNavCollapsed = false;
  screenWidth = 0;

  ngOnInit() {
    // Recupera el estado de showLogin del Local Storage al cargar la página
    const storedShowLogin = localStorage.getItem('showLogin');
    this.showLogin = storedShowLogin ? JSON.parse(storedShowLogin) : true;
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


}

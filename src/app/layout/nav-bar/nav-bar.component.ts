import { Component } from '@angular/core';
import { MenuItem } from './menu-item.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Agence',
      icon: 'home',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      navigate: '/peformance'
    },
    {
      label: 'Proyetos',
      icon: 'work',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      navigate: '#'
    },
    {
      label: 'Administrativo',
      icon: 'grading',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      navigate: '#'
    },
    {
      label: 'Comercial',
      icon: 'groups',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      navigate: '#'
    },
    {
      label: 'Financiero',
      icon: 'attach_money',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      navigate: '#'
    },
    {
      label: 'Usuario',
      icon: 'person',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      navigate: '#'
    },
  ];

}

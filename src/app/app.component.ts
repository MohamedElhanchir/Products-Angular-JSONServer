import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  actions :Array<any> = [
    {title: 'Home', icon: 'house', link: '/home'},
    {title: 'Products', icon: 'box', link: '/products'},
    {title: 'New Product', icon: 'plus-circle', link: '/new-product'}
  ]

  currentAction :any

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}

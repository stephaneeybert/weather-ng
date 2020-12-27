import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private translateService: TranslateService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.translateService.get('app.title').subscribe((text: string) => {
        console.log('The app title: ' + text);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

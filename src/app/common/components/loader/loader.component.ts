import { Component, OnInit, OnDestroy, NgZone, AfterViewInit, HostBinding } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  @HostBinding('class.loader-hidden') hidden = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.hidden = !state.show;
  });
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

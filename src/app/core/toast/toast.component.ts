import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { ToastData, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastRef } from './toast-ref';
import { toastAnimations, ToastAnimationState } from './toast-animation';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['toast.component.css'],
  animations: [toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';

  private intervalId: any;

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) { }

  ngOnInit(): void {
    this.intervalId = setTimeout(() => this.animationState = 'closing', 5000);
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  close(): void {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent): void {
    const { toState } = event;
    const isFadeOut: boolean = (toState as ToastAnimationState) === 'closing';
    const itFinished: boolean = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}

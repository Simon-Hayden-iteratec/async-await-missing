import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sub-route',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <a routerLink="/">Home</a>
    <h1>Image 2</h1>
    <img [src]="imagePromise | async" />
  `,
})
export class SubRouteComponent {
  readonly imagePromise = this.fetchImage();

  async fetchImage(): Promise<string> {
    const res = await fetch(
      'https://api.slingacademy.com/v1/sample-data/photos/2'
    );
    const json = await res.json();
    return json.photo.url;
  }
}

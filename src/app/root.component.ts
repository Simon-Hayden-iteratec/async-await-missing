import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `<a routerLink="/sub-route">Other component</a>
  <h1>Image 1</h1>
  <img [src]="imagePromise | async" />`
})
export class RootComponent {
  readonly imagePromise = this.fetchImage();

  async fetchImage(): Promise<string> {
    const res = await fetch(
      'https://api.slingacademy.com/v1/sample-data/photos/1'
    );
    const json = await res.json();
    return json.photo.url;
  }
}
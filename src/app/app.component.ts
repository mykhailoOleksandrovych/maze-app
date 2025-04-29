import { Component } from '@angular/core';
import { MazeComponent } from './maze/maze.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [MazeComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  
})
export class AppComponent {
  title = 'maze-app';
}

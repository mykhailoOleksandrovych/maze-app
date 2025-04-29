import { Component, OnInit } from '@angular/core';
import { MazeService } from '../maze.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maze',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
  providers: [MazeService]
})
export class MazeComponent implements OnInit {
  maze: number[][] = [];
  rows: number = 10;
  cols: number = Math.floor(this.rows*window.innerWidth/window.innerHeight);
  loading: boolean = false;

  constructor(private mazeService: MazeService) { }

  ngOnInit(): void {
    this.getMaze();
  }

  getMaze(): void {

    this.loading = true;
    
    this.mazeService.getMaze(this.rows, this.cols).subscribe(data => {
      this.maze = data;
      this.loading = false;
      this.maze[1][0] = 2;
      this.maze[this.rows*2][this.cols*2 - 1] = 3;
      this.maze[this.rows*2-1][this.cols*2 - 1] = 3;
    });
  }

  onMouseEnter(row: number, col: number): void {
    if (this.maze[row][col] === 0 && 
      (
        this.maze[row+1][col] === 2 ||
        this.maze[row-1][col] === 2 ||
        this.maze[row][col+1] === 2 ||
        this.maze[row][col-1] === 2

      )) {
      this.maze[row][col] = 2; // Зробити клітинку фіолетовою
    }
    if (this.maze[row][col] === 3 && 
      (
        this.maze[row+1][col] === 2 ||
        this.maze[row-1][col] === 2 ||
        this.maze[row][col+1] === 2 ||
        this.maze[row][col-1] === 2

      )) {
        this.mazeCompletion();
    }
  }

  mazeCompletion(): void {
    this.rows++;
    this.cols = Math.floor(this.rows*window.innerWidth/window.innerHeight);
    this.getMaze();
  }

  generateNewMaze(): void {
    this.getMaze();
  }
}

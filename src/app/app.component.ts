import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'horizontal-scroll-table';
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;
  @ViewChild('topScrollbar') topScrollbar!: ElementRef;
  @ViewChild('bottomScrollbar') bottomScrollbar!: ElementRef;
  data: any[] = [];
  tableWidth: number = 0;
  columns: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/mock-data.json').subscribe(data => {
      this.data = data;
      this.columns = Object.keys(data[0]);
      this.tableWidth = this.columns.length * 150; // Adjust column width to ensure table fits
    });
  }

  ngAfterViewInit(): void {
    this.syncScroll('bottom');
  }

  syncScroll(source: string): void {
    const topScrollbar = this.topScrollbar.nativeElement;
    const bottomScrollbar = this.bottomScrollbar.nativeElement;
    const tableWrapper = this.tableWrapper.nativeElement;

    if (source === 'top') {
      tableWrapper.scrollLeft = topScrollbar.scrollLeft;
      bottomScrollbar.scrollLeft = topScrollbar.scrollLeft;
    } else if (source === 'bottom') {
      tableWrapper.scrollLeft = bottomScrollbar.scrollLeft;
      topScrollbar.scrollLeft = bottomScrollbar.scrollLeft;
    } else {
      topScrollbar.scrollLeft = tableWrapper.scrollLeft;
      bottomScrollbar.scrollLeft = tableWrapper.scrollLeft;
    }
  }
}

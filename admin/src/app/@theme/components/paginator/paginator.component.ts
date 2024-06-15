import {Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ApiService} from "../../../@core/services/common";
import {finalize, Observable} from "rxjs";
import {SpinnerService} from "../spinner/spinner.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-paginator',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
  @Input() apiUrl!: string;
  @Input() currentPage!: number;
  @Input() lastPage!: number;
  @Output() dataList: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  goFirstPage() {
    this.changePage(1);
  }

  goPrevPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  goNextPage() {
    if (this.currentPage < this.lastPage) {
      this.changePage(this.currentPage + 1);
    }
  }

  goLastPage() {
    this.changePage(this.lastPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getData();
  }

  getPaginator(): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${this.currentPage}`);
  }

  getData() {
    this.getPaginator().subscribe(res => {
      this.dataList.emit(res);
    }, err => {
      this.dataList.emit(err);
    });
  }
}
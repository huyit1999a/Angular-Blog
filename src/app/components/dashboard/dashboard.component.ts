import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  postData!: any;
  p: number = 1;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.api.getPost().subscribe((res) => {
      this.postData = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postDetail!: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPostDetail();
  }

  getPostDetail() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.api.getPostDetail(id).subscribe((res) => {
      this.postDetail = res;
    });
  }

  goBack() {
    this.location.back();
  }
}

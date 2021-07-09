import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommentModel } from './comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  formComment!: FormGroup;
  commentModelObj: CommentModel = new CommentModel();
  commentData!: any;
  userData!: any;
  showAdd: boolean = true;
  showUpdate!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formComment = this.formBuilder.group({
      userId: ['', Validators.required],
      comment: ['', Validators.required],
    });

    this.getAllUsers();
    this.getAllComments();
  }

  postId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  getAllComments() {
    this.api.getAllComments().subscribe((res) => {
      this.commentData = res;
    });
  }

  createComment() {
    const postId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.commentModelObj.comment = this.formComment.value.comment;
    this.commentModelObj.userId = this.formComment.value.userId;
    this.commentModelObj.postId = postId;

    this.api.createComment(this.commentModelObj).subscribe(
      (res) => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formComment.reset();
        this.getAllComments();
      },
      (err) => {
        alert('Error');
      }
    );
  }

  onEdit(com: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.commentModelObj.id = com.id;
    this.formComment.controls['comment'].setValue(com.comment);
    this.formComment.controls['userId'].setValue(com.userId);
  }

  updateComment() {
    this.commentModelObj.comment = this.formComment.value.comment;
    this.commentModelObj.userId = this.formComment.value.userId;

    this.api
      .updateComment(this.commentModelObj, this.commentModelObj.id)
      .subscribe((res) => {
        this.showAdd = true;
        this.showUpdate = false;
        this.formComment.reset();
        this.getAllComments();
      });
  }

  deleteComment(com: any) {
    if (confirm('Are you sure?')) {
      alert('Deleted Successful');
      this.api.deleteComment(com.id).subscribe((res) => {
        this.getAllComments();
      });
    }
  }

  getAllUsers() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { PostModel } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  formPost!: FormGroup;
  postModelObj: PostModel = new PostModel();
  postData!: any;
  userData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  p: number = 1;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formPost = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      userId: ['', Validators.required],
    });

    this.getAllUsers();
    this.getAllPosts();
  }

  clickAddPost() {
    this.formPost.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  createPost() {
    this.postModelObj.title = this.formPost.value.title;
    this.postModelObj.content = this.formPost.value.content;
    this.postModelObj.userId = this.formPost.value.userId;

    this.api.createPost(this.postModelObj).subscribe(
      (res) => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formPost.reset();
        this.getAllPosts();
      },
      (err) => {
        alert('Error');
      }
    );
  }

  getAllUsers() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
    });
  }

  getAllPosts() {
    this.api.getPost().subscribe((res) => {
      this.postData = res;
    });
  }

  onEdit(post: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.postModelObj.id = post.id;
    this.formPost.controls['title'].setValue(post.title);
    this.formPost.controls['content'].setValue(post.content);
    this.formPost.controls['userId'].setValue(post.userId);
  }

  updatePostDetails() {
    this.postModelObj.title = this.formPost.value.title;
    this.postModelObj.content = this.formPost.value.content;
    this.postModelObj.userId = this.formPost.value.userId;

    this.api
      .updatePost(this.postModelObj, this.postModelObj.id)
      .subscribe((res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formPost.reset();
        this.getAllPosts();
      });
  }

  deletePost(post: any) {
    if (confirm('Are you sure?')) {
      this.api.deletePost(post.id).subscribe((res) => {
        this.getAllPosts();
      });
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserModel } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  formUser!: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  totalLength!: any;
  p: number = 1;
  order: string = 'name';
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formUser = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
    });

    this.getAllUsers();
  }

  clickAddUser() {
    this.formUser.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails() {
    if (this.formUser.invalid) {
      return;
    }

    this.userModelObj.name = this.formUser.value.name;
    this.userModelObj.email = this.formUser.value.email;
    this.userModelObj.password = this.formUser.value.password;
    this.userModelObj.birthDate = this.formUser.value.birthDate;

    this.api.postUser(this.userModelObj).subscribe(
      (res) => {
        console.log(res);
        this.closeModal?.nativeElement.click();
        this.formUser.reset();
        this.getAllUsers();
      },
      (err) => {
        alert('Error');
      }
    );
  }

  getAllUsers() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
      this.totalLength = res.length;
    });
  }

  deleteUser(user: any) {
    if (confirm('Are you sure?')) {
      this.api.deleteUser(user.id).subscribe((res) => {
        alert('User Deleted');
        this.getAllUsers();
      });
    }
  }

  onEdit(user: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = user.id;
    this.formUser.controls['name'].setValue(user.name);
    this.formUser.controls['email'].setValue(user.email);
    this.formUser.controls['password'].setValue(user.password);
    this.formUser.controls['birthDate'].setValue(user.birthDate);
  }

  updateUserDetails() {
    if (this.formUser.invalid) {
      return;
    }
    this.userModelObj.name = this.formUser.value.name;
    this.userModelObj.email = this.formUser.value.email;
    this.userModelObj.password = this.formUser.value.password;
    this.userModelObj.birthDate = this.formUser.value.birthDate;

    this.api
      .updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe((res) => {
        this.closeModal?.nativeElement.click();
        this.formUser.reset();
        this.getAllUsers();
      });
  }
}

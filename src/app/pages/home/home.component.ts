import { Component, OnInit } from '@angular/core';
import { Department, Post } from 'src/app/types/types';
import { DepartmentsService } from '../departments/departments.service';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  homeCalendar: boolean = true;
  posts: Post[] = [];
  loading: boolean = true;
  error: any;
  departments: Department[] = [];
  private _isUserPosts: boolean = false;

  constructor(
    private postsService: PostsService,
    private departmentService: DepartmentsService
  ) {
    this.departmentService.changeDepartments.subscribe((department) => {
        this.departments = department
        this.departments = this.departments.slice(0, 6)
    });

    this.postsService.changePosts.subscribe((posts) => {
      this.posts = posts;
      this.posts = this.posts.slice(0, 3)
    });
    this.postsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.postsService.changeError.subscribe((error) => {
      this.error = error;
    });
  }
  get isUserPosts() {
    return this._isUserPosts;
  }

  ngOnInit(): void {
    this.postsService.queryPosts();
    this.departmentService.queryDepartment();
  }
  likes(comment: any) {
    return this.postsService.countLikes(comment);
  }
}

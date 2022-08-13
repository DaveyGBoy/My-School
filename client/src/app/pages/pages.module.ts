import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { LoginComponent } from './login/login.component';
import { CommentsComponent } from './posts/post/comments/comments.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostComponent,
    LoginComponent,
    CommentsComponent,
    SignupComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HomeComponent, PostsComponent, LoginComponent, SignupComponent],
})
export class PagesModule {}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ADD_POST, UPDATE_PHOTOS } from 'src/app/services/graphql/mutations';
import { UPDATE_POST } from 'src/app/services/graphql/mutations';
import { QUERY_POSTS } from 'src/app/services/graphql/queries';

import * as S3 from 'aws-sdk/clients/s3';
import { ACCESS, BUCKET, SECRET } from 'env';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormPostService {
  uploadSuccess$: Subject<any[]> = new Subject();
  loading: boolean = true;

  constructor(private apollo: Apollo, private router: Router) {}

  addPost(
    isVisible: boolean,
    title: string,
    description: string,
    isEvent: boolean,
    selectedDepartmentId: string,
    selectedGradeId: string,
    eventDate: string,
    eventEndDate: string,
    eventLocation: string,
    photo: object
  ) {
    this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          isVisible: isVisible,
          title: title,
          description: description,
          isEvent: isEvent,
          eventDate: eventDate,
          eventEndDate: eventEndDate,
          eventLocation: eventLocation,
          departmentId: selectedDepartmentId,
          gradeId: selectedGradeId,
        },

        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result, result.data.addPost._id);
          const id = result.data.addPost._id;
          if (photo) {
            this.uploadPhotos(photo, id);
          };
          this.loading = result.loading;
          result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('add post error', error);
        }
      );
  }

  updatePost(
    postId: string,
    isVisible: boolean,
    title: string,
    description: string,
    isEvent: boolean,
    selectedDepartmentId: string,
    selectedGradeId: string,
    eventDate: string,
    eventEndDate: string,
    eventLocation: string,
  ) {
    this.apollo
      .mutate({
        mutation: UPDATE_POST,
        variables: {
          postId: postId,
          isVisible: isVisible,
          title: title,
          description: description,
          isEvent: isEvent,
          eventDate: eventDate,
          eventEndDate: eventEndDate,
          eventLocation: eventLocation,
          departmentId: selectedDepartmentId,
          gradeId: selectedGradeId,
        },
        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result);
          this.loading = result.loading;

          result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('Failed to update error', error);
        }
      );
  }
  uploadPhotos(file: any, id: any) {
    const bucket = new S3({
      accessKeyId: ACCESS,
      secretAccessKey: SECRET,
      region: 'us-east-2',
    });
    const contentType = file.type;
    const params = {
      Bucket: BUCKET,
      Key: id,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('EROOR: ', JSON.stringify(err));
        return false;
      }
      console.log('File Uploaded.', data.Location);
      this.updatePhotos([data.Location], id);
      return true;
    });
  }

  updatePhotos(location: any[], id: string) {
    this.apollo
      .mutate({
        mutation: UPDATE_PHOTOS,
        variables: {
          id: id,
          pictures: location,
        },
        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got photos', result);
          this.loading = result.loading;
          // result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('update photos error', error);
        }
      );
  }
}

import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Rx';

import { Comment } from '../models/comment'

@Injectable()
export class CommentService {
  private usersUrl:string = 'http://localhost:3001/api/comments'
  constructor(private http: Http) { }

  // Get users *************************
  getComments(): Observable<Comment[]> {
    return this.http.get(this.usersUrl)
    .map(res => res.json())
    .catch(this.handleError)
  }

  // Get single user ************************
 createComment(comment): Observable<Comment> {
    return this.http.post(this.usersUrl, comment)
    .map(res => res.json())
    .catch(this.handleError)
  }

  // Handle any errors from API *****************
  private handleError(err) {
    let errMessage:string
    if (err instanceof Response) {
      let body = err.json() || ''
      let error = body.error || JSON.stringify(body)
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`
    } else {
      errMessage = err.message ? err.message : err.toString()
    }

    return Observable.throw(errMessage)
  }
}
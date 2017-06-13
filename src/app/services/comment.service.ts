import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Rx';

import { Comment } from '../models/comment'

@Injectable()
export class CommentService {
  private commentsUrl = 'http://localhost:3001/api/comments'
  constructor(private http: Http) { }

  getComments(): Observable<Comment[]> {
    return this.http.get(this.commentsUrl)
    .map(res => res.json())
    .catch(this.handleError)
  }

 createComment(comment): Observable<Comment> {
    return this.http.post(this.commentsUrl, comment)
    .map(res => res.json())
    .catch(this.handleError)
  }

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
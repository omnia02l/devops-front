import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment, Post} from "../models/Post";
import {AllPostStats, MyPostStats} from "../models/MyPostStats";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  host = "http://localhost:8085/post/";

  constructor(private http: HttpClient) {
  }

  public myPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.host + "my-posts")
  }

  public listPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.host + "list-posts")
  }

  public createPost(post: Post): Observable<string> {
    return this.http.post<string>(this.host + "create-post", post, {
      responseType: 'text' as 'json'
    })
  }

  public addComment(id: number, comment: Comment): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.post<string>(this.host + "add-comment", comment, {
      params,
      responseType: 'text' as 'json'
    })
  }

  public like(id: number): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.post<string>(this.host + "like", null, {
      params,
      responseType: 'text' as 'json'
    })
  }

  public dislike(id: number): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.post<string>(this.host + "dislike", null, {
      params,
      responseType: 'text' as 'json'
    })
  }

  public deletePost(id: number): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<string>(this.host + "delete-post", {
      params,
      responseType: 'text' as 'json'
    })
  }

  public deleteComment(id: number): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<string>(this.host + "delete-comment", {
      params,
      responseType: 'text' as 'json'
    })
  }

  public myPostStats(): Observable<MyPostStats> {
    return this.http.get<MyPostStats>(this.host + "my-post-stats")
  }

  public allPostStats(): Observable<AllPostStats> {
    return this.http.get<AllPostStats>(this.host + "all-post-stats")
  }

  public getTop3PostsByLikes(): Observable<Post[]> {
    return this.http.get<Post[]>(this.host + "top-3-posts-by-likes");
  }
}

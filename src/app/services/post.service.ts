import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.url + 'posts')
  }

  createPost(post: any){
    return this.http.post(this.url + 'posts', JSON.stringify(post))
  }

  updatePost(post: any){
    return this.http.patch(this.url + 'posts/' + post.id, JSON.stringify({title: 'Title Changed'}))
  }

  deletePost(id:number){
    return this.http.delete(this.url + 'posts/' + id).catch();
  }
}

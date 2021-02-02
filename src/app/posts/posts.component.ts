import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})


export class PostsComponent  implements OnInit{

  posts: any;

  constructor(private service: PostService) {
      
   }
    
   ngOnInit() {
        this.service.getPosts()
       .subscribe(Response =>{
         console.log(Response);
         this.posts = Response;
       }, 
       error => {
         alert('Unexpected error occured');
         console.log(error)
       })
  }

   createPost(input: HTMLInputElement){
     let post: any = {
       userId: 11,   
       title: input.value,
       body: 'This is the body of the post'
    }
      this.service.createPost(post)
     .subscribe(Response => {
        post.id  = Response.id;
        this.posts.splice(0, 0, post)
        console.log(Response);
     }, 
     error => {
       alert('Unexpected error occured');
       console.log(error);
     })
   }

   updatePost(post: { id: any; }){
     this.service.updatePost(post)
     .subscribe(Response => {
       console.log(Response);
       
     }, 
     error => {
       console.log(error)
       alert('Unexpected errors occured');
     }) 
   }

   deletePost(post: { id: number; }){
     this.service.deletePost(post.id)
     .subscribe( Response => {
       let index = this.posts.indexOf(post);
       this.posts.splice(index, 1);
     }, 
     (error: Response) => {
        if (error.status === 200) 
          alert('This post is already deleted')
        else{
          console.log(error)
          alert('Unexpected error occured');
        }  
     });
   }
}


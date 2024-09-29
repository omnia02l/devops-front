import {Component, OnInit} from '@angular/core';
import {Comment, Post} from "../../../../../core/models/Post";
import {MenuItem, MessageService} from "primeng/api";
import {PostService} from "../../../../../core/services/post.service";
import {AllPostStats, MyPostStats} from "../../../../../core/models/MyPostStats";

@Component({
  selector: 'app-pba',
  templateUrl: './pba.component.html',
  styleUrls: ['./pba.component.css'],
  providers:[MessageService]
  
})
export class PbaComponent implements OnInit{

  allPostsStats:AllPostStats={};
  myPosts: Post[] = [];
  descriptionDialog = false;
  description!: string;
  comments!: Comment[];
  commentsDialog = false;
  newPost: Post = {};
  submitted = false;
  addNewPostDialog = false;
  postId!: number;
  addCommentDialog = false;
  newComment: Comment = {};
  deletePostDialog = false;
  updateOption = false;
  timestamp=new Date().getTime();
  items: MenuItem[];
  src='';
  src2:string = "http://localhost:8085/post/getimage/";
  path:string = "http://localhost:8085/post/addimage/";
  path2:string = "http://localhost:8085/post/getimage/";
  data: any;
  data1: any;
  data2: any;
  optionsChart: any;
  myPostStats:MyPostStats={}
  constructor(private messageService: MessageService, private postService: PostService) {

    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
      { label: 'My-events', icon: 'pi pi-fw pi-calendar', routerLink: ['/my-events']},
      { label: 'Training', icon: 'pi pi-fw pi-pencil',  routerLink: ['/training']},
      { label: 'My Post', icon: 'pi pi-fw pi-file', routerLink: ['/post'] },
      { label: 'All posts', icon: 'pi pi-fw pi-cog', routerLink: ['/all-post'] },
      { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: ['/profile'] }
    ];
  }

  ngOnInit(): void {
    this.myPost();
    this.MyPostStats();
    this.AllPostStats()
  }

  errorUplodingImgae() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Upload Error', life: 3000});
  }



  myPost() {
    this.postService.myPosts().subscribe({
      next: (data) => {
        this.myPosts = data.reverse();
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  onUpload(id:number) {
    this.timestamp=new Date().getTime();
    this.src2=this.src2+id+"?t="+this.timestamp;
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Uploaded', life: 3000});
  }

  showDescription(description: string) {
    this.description = description;
    this.descriptionDialog = true;
  }

  showComments(comments: Comment[]) {
    this.comments = comments.reverse();
    this.commentsDialog = true;
  }

  createNewPost() {
    this.submitted = true;
    if (this.newPost.title) {
      this.postService.createPost(this.newPost).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addNewPostDialog = false;
          this.myPost();
        },
        error: () => {
          this.addNewPostDialog = false;
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        }
      });
    }
  }

  addComment(id: number) {
    this.postId = id;
    this.submitted = false;
    this.newComment = {};
    this.addCommentDialog = true;
  }

  createComment() {
    this.submitted = true;
    if (this.newComment.text) {
      this.postService.addComment(this.postId, this.newComment).subscribe({
        next: (data) => {
          console.log(data)
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
          this.addCommentDialog = false;
          this.myPost();
        },
        error: () => {
          this.addCommentDialog = false;
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        }
      });
    }
  }

  deletePost(id: number) {
    this.postId = id;
    this.deletePostDialog = true;
  }

  confirmDelete() {
    this.postService.deletePost(this.postId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.deletePostDialog = false;
        this.myPost();
      }, error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        this.deletePostDialog = false;
      }
    });
  }

  updatePost(post: Post) {
    this.updateOption = true;
    this.newPost = post;
    this.addNewPostDialog = true;
    this.submitted = false;
  }

  update() {
    this.createNewPost();
  }

  deleteComment(id: number) {
    this.postService.deleteComment(id).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.commentsDialog = false;
        this.myPost();
      }, error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        this.commentsDialog = false;
      }
    });
  }

  like(id: number) {
    console.log(id)
    this.postService.like(id).subscribe({
      next: (data) => {
        if (data === 'ok') {
          this.myPost();
        } else {
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: 'already liked', life: 3000});
        }
      }, error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  dislike(id: number) {
    this.postService.dislike(id).subscribe({
      next: (data) => {
        if (data === 'ok') {
          this.myPost();
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'already disliked', life: 3000});
        }
      }, error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  MyPostStats(){
    this.postService.myPostStats().subscribe({
      next:(data)=>{
        this.myPostStats=data;
        this.data1 = {
          labels: ['Total','Likes','Dislikes'],
          datasets: [
            {
              data: [this.myPostStats.postNumber,this.myPostStats.likesNumber,this.myPostStats.dislikesNumber],
              backgroundColor: [
                "#0000FF",
                "#800080",
                "#026678"
              ],
              hoverBackgroundColor: [
                "#0000FF",
                "#800080",
                "#026678"
              ]
            }
          ]
        };
        this.optionsChart = {
          plugins: {
            title: {
              display: true,
              fontSize: 25
            },
            legend: {
              position: 'top'
            }
          }
        };
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  AllPostStats(){
    this.postService.myPostStats().subscribe({
      next:(data)=>{
        this.allPostsStats=data;
        this.data2 = {
          labels: ['Total','Likes','Dislikes'],
          datasets: [
            {
              data: [this.allPostsStats.postNumber,this.allPostsStats.likesNumber,this.allPostsStats.dislikesNumber],
              backgroundColor: [
                "#0000FF",
                "#800080",
                "#026678"
              ],
              hoverBackgroundColor: [
                "#0000FF",
                "#800080",
                "#026678"
              ]
            }
          ]
        };
        this.optionsChart = {
          plugins: {
            title: {
              display: true,
              fontSize: 25
            },
            legend: {
              position: 'top'
            }
          }
        };
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}

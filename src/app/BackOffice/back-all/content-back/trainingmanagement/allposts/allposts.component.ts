import {Component, OnInit} from '@angular/core';
import {Comment, Post} from "../../../../../core/models/Post";
import {MenuItem, MessageService} from "primeng/api";
import {PostService} from "../../../../../core/services/post.service";
import {AllPostStats} from "../../../../../core/models/MyPostStats";

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css'],
  providers: [MessageService]
})
export class AllpostsComponent implements OnInit{

  allPosts: Post[] = [];
  descriptionDialog = false;
  description!: string;
  comments!: Comment[];
  commentsDialog = false;
  postId!: number;
  newComment: Comment = {};
  submitted = false;
  addCommentDialog = false;
  items: MenuItem[];
  data: any;
  optionsChart: any;
  allPostsStats:AllPostStats={};
  src: any = "http://localhost:8085/post/getimage/";
  top3Posts: Post[] = [];

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
    this.listPost()
    this.AllPostStats()
   
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
          this.listPost();
        },
        error: () => {
          this.addCommentDialog = false;
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        }
      });
    }
  }

  listPost() {
    this.postService.listPosts().subscribe({
      next: (data) => {
        this.allPosts = data.reverse();
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  showComments(comments: Comment[]) {
    this.comments = comments.reverse();
    this.commentsDialog = true;
  }

  showDescription(description: string) {
    this.description = description;
    this.descriptionDialog = true;
  }

  like(id: number) {
    console.log(id)
    this.postService.like(id).subscribe({
      next: (data) => {
        if (data === 'ok') {
          this.listPost();
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
          this.listPost();
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'already disliked', life: 3000});
        }
      }, error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  AllPostStats(){
    this.postService.myPostStats().subscribe({
      next:(data)=>{
        this.allPostsStats=data;
        this.data = {
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

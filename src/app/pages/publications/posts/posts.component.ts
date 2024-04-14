// posts.component.ts
import { Component, OnInit } from '@angular/core';
import { DialogPostService } from '../../../services/dialogPost.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DataService } from '../../../services/dataService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaskService } from 'src/app/services/mask.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private dialogPostService: DialogPostService,
    private router: Router,
    public login: LoginService,
    public dataService: DataService,
    private _snackBar: MatSnackBar,
    public maskService:MaskService
  ) {}

  posts: any[] = [];
  maxWordsToShow = 50;
  addComment : Boolean = false;
  opened !: Number;
  newComment !: String;
  searchParam: string = '';
  sortBy: string = 'date';
  ngOnInit(): void {
    this.maskService.isLoading = true;
    this.cargarPosts();
  }

  cargarPosts():void{
    this.postService.getAllPosts().subscribe((response: any) => {
      this.posts = response;
      this.maskService.isLoading = false;
    });
  }

  toggleLike(post: any): void {
    post.likedByLoggedUser = !post.likedByLoggedUser;
    post.likeAmount = post.likedByLoggedUser ? post.likeAmount+1: post.likeAmount-1
    this.postService.likePost(post.postId).subscribe((data=>{
      console.log(data);
    }))
  }

  openComments(idComment : any){
    this.opened = idComment;
    this.addComment = true;
  }

  closeComments(){
    this.newComment = "";
    this.opened = 0;
    this.addComment = false;
  }

  sendComment(postId : any){
    let commentObj = {
      post_id : postId,
      date : new Date(),
      comment : this.newComment
    }
    this.dataService.addComment(commentObj).subscribe((response: any) => {
      if(response.id){
        this._snackBar.open("Su comentario fue enviado con éxito.", undefined, { duration: 5 * 1000 });
        this.closeComments()
      }else{
        this._snackBar.open(
          'Ocurrió un problema al crear su comentario.', undefined, { duration: 5 * 1000 });
        this.closeComments()
      }
    });
  }

  openPost(post: any): void {
    this.dialogPostService.openPostDialog(post);
  }

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  }

  newPostRoute() {
    this.router.navigate(['/community/publication-details']);
  }

  editPostRoute(param: number) {
    this.router.navigate([`/community/publication-details/${param}`]);
  }

  borrarPost(postId: number){
    Swal.fire({
      title: 'Borrar publicación',
      text: '¿Deseas borrar la publicación?',
      showDenyButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "Aceptar"
        this.postService.borrarPost(postId).subscribe((response:any) => {
          console.log('borrar')
          this.cargarPosts();
        })
      }
    });


  }

  // Propiedad computada para el contenido truncado.
  getTruncatedContent(post: any): string {
    if (post && post.content) {
      const words = post.content.split(' ');
      const truncatedWords = words.slice(0, this.maxWordsToShow).join(' ');
      return words.length > this.maxWordsToShow
        ? truncatedWords + '...'
        : truncatedWords;
    }
    return '';
  }

  onSearch(event:any){
    this.searchParam = event?.target.value;
    this.postService.getAllPosts(event?.target.value,this.sortBy).subscribe((data:any) =>{
      this.posts = data;
    })
  }

  sortByPopular(){
    this.sortBy = 'likes';
    this.maskService.isLoading = true;
    this.postService.getAllPosts(this.searchParam,this.sortBy).subscribe((data:any)=>{
      this.posts = data;
      this.maskService.isLoading = false;
    })
  }

  sortByDate(){
    this.sortBy = 'date';
    this.maskService.isLoading = true;
    this.postService.getAllPosts(this.searchParam,this.sortBy).subscribe((data:any)=>{
      this.posts = data;
      this.maskService.isLoading = false;
    })
  }
}

import { DialogService } from './../../../services/dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../services/dataService.service';



@Component({
  selector: 'app-dialog-posts',
  templateUrl: './dialog-posts.component.html',
  styleUrls: ['./dialog-posts.component.scss'],
})
export class DialogPostsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private dataService: DataService,) {}

  noComments : Boolean = true;
  commentsArray: Array<any> = [];
  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    this.dataService.getCommentsByPost(this.data.post.postId).subscribe((response: any) => {
      if(response.length != 0){
          this.commentsArray = response.reverse()
          this.noComments = false;
      }
    });
  }
}

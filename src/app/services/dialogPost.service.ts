// post-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostsComponent } from '../components/publications/dialog-posts/dialog-posts.component';

@Injectable({
  providedIn: 'root',
})
export class DialogPostService {
  constructor(private dialog: MatDialog) {}

  openPostDialog(post: any): void {
    this.dialog.open(DialogPostsComponent, {
      data: { post },
      width: '80%', // Ajusta el ancho según tus necesidades
      height: '80%',
    });
  }
}

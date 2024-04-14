import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
  standalone: true,
  imports:[MatButtonModule]
})
export class UploadButtonComponent implements OnInit {

  @Input() public onFileUpload: (param:any) => void;

  constructor() {}

  ngOnInit(): void {
  }

  onFileUploadInput(event:any){
    this.onFileUpload(event.target.files[0])
  }
}

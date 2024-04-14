import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadButtonComponent } from 'src/app/components/upload-button/upload-button.component';
import { ChangeDetectorRef } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MaskService } from 'src/app/services/mask.service';

const noImagePath = '../../assets/noImage.jpg'
@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.scss'],
  imports: [TextAreaComponent,ButtonComponent,MatButtonModule,InputComponent,UploadButtonComponent],
  standalone: true,
})
export class PublicationDetailsComponent implements OnInit {

  private postId: string;
  public imageUrl: string;
  public previewUrl: any;
  public subject: string;
  public content: string;
  private file: any;
  constructor(private route: ActivatedRoute, private router:Router ,private cdr: ChangeDetectorRef, private postService:PostService, private maskService:MaskService) { }

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
      this.postId = params['postId'];
  });
    this.getPost();
  }

  public submit = (event: Event) => {
    event.preventDefault();
    if(this.subject && this.content && (this.file || this.imageUrl!=noImagePath)){
      const formData = new FormData();
      this.maskService.isLoading = true;
      if(this.postId)formData.append('postId', this.postId);
      if(this.file)formData.append('file', this.file);              
      formData.append('subject', this.subject);
      formData.append('content',this.content);
      this.postService.crearPost(formData).subscribe({
        next: (response) => {Swal.fire({
          title: 'Post',
          text: 'Información Guardada',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f25287',
        })
        .then(response => this.router.navigate(['/community/publication-posts']))
        this.maskService.isLoading = false;  
      },
        error: (error) => {
        
        console.log(error)
        Swal.fire({
          title: 'Error no se pude crear la publicación, intentelo nuevamente',
          text: error.error.message,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f25287',
        }).then(response => this.getPost());
        this.maskService.isLoading = false;  
      }
    })
  }else{
    Swal.fire({
      title: 'Validación',
      text: 'La imagen es requerida para el post',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f25287',
    }).then(response => this.getPost());
  }}

  public onFileUpload = (file:Blob) =>{
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.previewUrl = fileReader.result as string;
      this.cdr.detectChanges();
    };
    fileReader.readAsDataURL(file);
    this.file = file;
  }

  public onChangeContent(text:string){
    this.content = text;
  }

  public onChangeSubject(text:string){
    this.subject = text;
  }

  private getPost(){
    if(this.postId){
      this.postService.getPost(this.postId).subscribe({
      next: (response:any) => {
        this.imageUrl = response.imageUrl ? response.imageUrl : noImagePath;
        this.subject = response.subject;
        this.content = response.content;
      },
      error: (error) => 
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema obteniendo la información del post',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f25287',
        customClass: 'confirmation-button'
      })});
      return;
    }
    this.imageUrl = noImagePath;
  }

  navigateToPostPage(){
    this.router.navigate(['/community/publication-posts']);
  }
}

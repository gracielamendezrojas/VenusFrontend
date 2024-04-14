import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public crearPost(data: any) {
    return this.http.post(`${baserUrl()}/rest/post/create`, data);
  }

  public getPost(postId: any) {
    return this.http.get(`${baserUrl()}/rest/post/getPost?postId=${postId}`);
  }

  public getAllPosts(searchParam?:string, sortBy?: string) {
    return this.http.get(!searchParam ?`${baserUrl()}/rest/post/getAllPosts?sortBy=${sortBy}`:`${baserUrl()}/rest/post/getAllPosts?searchParam=${searchParam}&sortBy=${sortBy}`);
  }

  public likePost(postId:string) {
    return this.http.get(`${baserUrl()}/rest/post/likePost?postId=${postId}`);
  }

  public borrarPost(postId: number){
    return this.http.delete(`${baserUrl()}/rest/post/borrar/${postId}`);
  }
}

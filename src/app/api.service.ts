import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'http://localhost/responsi2_api/';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login.php`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create_user.php`, data);
  }

  getToys(userId?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}read_toy.php${userId ? `?user_id=${userId}` : ''}`);
  }

  createToy(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create_toy.php`, data);
  }

  updateToy(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}update_toy.php`, data);
  }

  deleteToy(toyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete_toy.php?toy_id=${toyId}`);
  }

  getToyStories(toyId?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}show_toy_stories.php${toyId ? `?toy_id=${toyId}` : ''}`);
  }

  createToyStory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create_toy_story.php`, data);
  }

  updateToyStory(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}update_toy_story.php`, data);
  }
  
  deleteToyStory(storyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete_toy_story.php?story_id=${storyId}`);
  }
}
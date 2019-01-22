import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { config } from './app.config';
import { Task } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app';
  tasks: Observable<Task[]>;

  constructor(private db: AngularFirestore){}

  ngOnInit(): void {
    this.tasks = this.db.collection(config.collection_endpoint).valueChanges() as Observable<Task[]>;   
  }
}

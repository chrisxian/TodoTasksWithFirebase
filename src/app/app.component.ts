import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { config } from './app.config';
import { Task } from './app.model';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app';
  tasks: Observable<Task[]>;
  myTask: string;
  editMode: boolean = false;
  taskToEdit: any = {};

  constructor(private db: AngularFirestore, private taskService: AppService){}

  ngOnInit(): void {
    this.tasks = this.db
      .collection(config.collection_endpoint)
      .snapshotChanges()
      .pipe(
        map(actions=>{
          return actions.map(a=>{
            //get document data
            const data = a.payload.doc.data();
            //get document id
            const id = a.payload.doc.id;
            //Spread syntax ( 展开语法)： 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开
            //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            return {id, ...data} as Task;
          })
        })        
      );
  }

  edit(task){
    console.log(task);
    this.taskToEdit = task;
    this.editMode = true;
    this.myTask = task.description;
  }

  saveTask(){
    if(this.myTask!==null){
      let task = {
        description: this.myTask
      };
    
      if(!this.editMode){
        console.log(task);
        this.taskService.addTask(task);
      }else{
        let taskId = this.taskToEdit.id;
        this.taskService.updateTask(taskId, task);
      }
      this.editMode = false;
      this.myTask = ""
    }
  }

  log(x){
    console.log("hi, i'm printing x");
    console.log(x);
  }

  deleteTask(task) {

    //Get the task id 
    let taskId = task.id; 
    //delete the task 
    this.taskService.deleteTask(taskId);
  }
}

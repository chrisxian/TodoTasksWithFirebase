import { Injectable } from '@angular/core';
import { config } from "./app.config";

import { Task } from "./app.model";
import { AngularFirestoreDocument, AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/firestore';

// service class annotated with @Injectable()
@Injectable({
  providedIn: 'root'
})

export class AppService {

  tasks: AngularFirestoreCollection<Task>;
  private taskDoc : AngularFirestoreDocument<Task>;

  //Injectables are just normal classes (normal objects) and as such, they have no special lifecycle.
  //When an object of your class is created, the class’s constructor is called, so that’s what your “OnInit” would be.
  //https://stackoverflow.com/questions/36188966/life-cycle-methods-for-services-in-angular2
  constructor(private db: AngularFirestore) {
      this.tasks = db.collection<Task>(config.collection_endpoint);
   }

   addTask(task){
     this.tasks.add(task);
   }

   updateTask(id, update){
     this.taskDoc = this.db.doc<Task>('${config.collection_endpoint}/${id}');
     this.taskDoc.update(update);
   }

   deleteTask(id){
    this.taskDoc = this.db.doc<Task>('${config.collection_endpoint}/${id}');
    this.taskDoc.delete();
   }
}

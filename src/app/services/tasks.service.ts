import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { addDoc, collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private firestore: Firestore) { }

  getTasks(): Observable<DocumentData[]> {
    const taskRef = collection(this.firestore, 'tasks');
    return collectionData(taskRef, {idField: "id"});
  }

  addTask(task: Task) {
    const taskRef = collection(this.firestore, 'tasks');
    return addDoc(taskRef, task);
  }
}

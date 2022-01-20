import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore) { }

  getOrders(): Observable<DocumentData[]> {
    const orderRef = collection(this.firestore, 'orders');
    return collectionData(orderRef, {idField: "id"})
  }

  deleteOrder(order: Order) {
    const orderDocRef = doc(this.firestore, `orders/${order.id}`);
    return deleteDoc(orderDocRef);
  }

  addOrder(order: Order){
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, order);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "../interfaces/user";

import {
  collection,
  collectionData,
  Firestore,
  DocumentData,
  docData,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "@angular/fire/firestore";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class UserService{

  constructor(private http: HttpClient, private firestore: Firestore) {}

  //FireStore interaction methods
  
  getUsersFromFireBase(): Observable<DocumentData[]> {
    const userRef = collection(this.firestore, "users");
    return collectionData(userRef, { idField: "id" });
  }
  getUserFromFireBase(id: string): Observable<DocumentData> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: "id" });
  }
  addUsertoFireBase(userParam: User) {
    const userRef = collection(this.firestore, "users");
    return addDoc(userRef, userParam);
  }
  
  deleteUserFromFirebBase(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(userDocRef);
  }
  // //THIS METHOD GET CALLED FROM AddRaportComponent in  this.updateMaterials(
    //             this.clonedMaterials[j],
    //             this.materialsFiltered[i]
    //           );
    
    // Gets the new quantity of the material and updates the result to the firebase (OldQ - NewQ)
    updateUserFromFirebase(user:User,newUser: User) {
      
      const userDocRef = doc(this.firestore, `users/${user.id}`);
      return updateDoc(userDocRef, { status: user.balance - newUser.balance});
    }
    
    //////////////////////////////////////////////////////////////////////////////////////  
    editUserFromFirebBase(user:User) {
      const userDocRef = doc(this.firestore, `users/${user.id}`);
      return updateDoc(userDocRef, { status:user.status,role: user.role, balance: user.balance})
    }
    
}

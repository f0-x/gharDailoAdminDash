import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../interfaces/report';
import { addDoc, collection, collectionData, doc, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private firestore: Firestore) { }

  getReports(): Observable<DocumentData[]> {
    const reportsRef = collection(this.firestore, 'reports');
    return collectionData(reportsRef, { idField: "id"} )
  }

  addReport(report: Report) {
    const reportRef = collection(this.firestore, 'reports');
    return addDoc(reportRef, report);
  }

  updateReport(report: Report) {
    const reportDocRef = doc(this.firestore, `reports/${report.id}`);
    return updateDoc(reportDocRef, {bill: true});
  }

  reloadPage() {
    window.location.reload();
  }
}

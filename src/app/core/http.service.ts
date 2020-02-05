import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { from, Observable, of } from "rxjs";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private db: AngularFirestore) {}

  getAll<T>(collection: string, query: StoreQuery = null): Observable<T[]> {
    return this.db
      .collection<T>(collection, ref => {
        if (query) {
          return ref.where(query.field, query.operator, query.value);
        }
        return ref;
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => ({
            id: action.payload.doc.id,
            ...action.payload.doc.data()
          }));
        })
      );
  }

  getOne<T>(collection: string, documentKey: string): Observable<T> {
    return this.db
      .collection<T>(collection)
      .doc(documentKey)
      .valueChanges()
      .pipe(
        map(action => {
          (action as any).id = documentKey;
          return action as T;
        })
      );
  }

  add<T>(collection: string, document: T) {
    return of(this.db.collection<T>(collection).add(document));
  }

  update<T>(collection: string, documentKey: string, document: T) {
    return from(
      this.db
        .collection<T>(collection)
        .doc(documentKey)
        .set(document)
    );
  }

  delete<T>(collection: string, documentKey: string) {
    return from(
      this.db
        .collection<T>(collection)
        .doc(documentKey)
        .delete()
    );
  }
}

export interface StoreQuery {
  field: string;
  operator: WhereFilterOp;
  value: string | boolean;
}

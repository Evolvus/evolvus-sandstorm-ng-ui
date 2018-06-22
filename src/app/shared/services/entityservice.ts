import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';


@Injectable()
export class EntityService {

    allEntityExport = new Subject<any>();
    platformURL = environment.platformURL;
    httpOptions: any;
    responseToBack=new Subject<any>();

    constructor(public http: HttpClient) { 
        this.httpOptions = {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          };
    }

    fetchAllEntities() {
        this.http.get(`${this.platformURL}/api/entity`)
            .subscribe((response: any) => {
                if (response.message == "No Entitites found") {
                    this.allEntityExport.next(response);
                } else {
                    var exportEntities = response;
                    this.allEntityExport.next(exportEntities);
                }
            });
    }

    saveEntity(entityToSave) {
       this.http.post(`${this.platformURL}/api/entity`, JSON.stringify(entityToSave),this.httpOptions).subscribe((data) => {
        this.responseToBack.next(data);
            console.log('response on save', JSON.stringify(data));
        });
    }
}
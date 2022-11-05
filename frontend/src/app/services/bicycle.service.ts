import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  endPoint = "http://localhost:8080/api/bicycles";

  httpOptions = {
    headers: new HttpHeaders ({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  getBicycles(){
    return this.httpClient.get(this.endPoint);
  }

  getBicycle(id): Observable<BicycleService[]> {
    return this.httpClient.get<BicycleService[]>(this.endPoint + '/' + id);
  }

  createBicycle(bicycle, blob){
    let formData = new FormData();
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  deleteBicycle(id): Observable<BicycleService[]> {
    return this.httpClient.delete<BicycleService[]>(this.endPoint + '/' + id);
  }

  updateBicycle(id, bicycle: BicycleService): Observable<any> {
    return this.httpClient.put(this.endPoint + '/' + id, JSON.stringify(bicycle), this.httpOptions);
  }
}

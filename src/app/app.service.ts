import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  readonly URL =
    "http://us-central1-onsurance-new.cloudfunctions.net/quote/tires";
  constructor(private http: HttpClient) {}

  add(dado: any) {
    let params = new HttpParams();
    params = params.set("totalValue", dado.totalValue);
    params = params.set("qtd", dado.qtd);
    params = params.set("vehicleType", dado.vehicleType);
    params = params.set("firstName", dado.firstName);
    params = params.set("lastName", dado.lastName);
    params = params.set("userEmail", dado.userEmail);
    params = params.set("vehiclePlate", dado.vehiclePlate);
    params = params.set("dailyUsage", dado.dailyUsage);
    params = params.set("phone", dado.phone);
    params = params.set("hora", dado.hora);
    return this.http.get<any>(this.URL, { params });
  }
}

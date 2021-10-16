import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url:string;
  constructor(private _http:HttpClient) { 
    this.url=environment.url;
  }
  registrarCategoria(categoria:Categoria):Observable<any>{
    var json=JSON.stringify(categoria);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'/categoria',json,{headers:headers});
  }
  buscarPorCategoria(palabra:string):Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/filtroCategoria/'+palabra,{headers:headers});
  }
  obtenerCategorias():Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/categoria',{headers:headers});
  }
}

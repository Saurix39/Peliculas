import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  public url:string;
  constructor(private _http:HttpClient) {
    this.url=environment.url;
  }
  getNovedades():Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/novedad',{headers:headers});
  }

  getPeliculas():Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/peliculas',{headers:headers});
  }
  getPeliculasXCat():Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/peliculasCategoria',{headers:headers});
  }
  buscarPelicula(titulo:string):Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/buscar/'+titulo,{headers:headers});
  }
  guardarPelicula(pelicula:Pelicula):Observable<any>{
    var json = JSON.stringify(pelicula);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'/pelicula',json,{headers:headers});
  }
  setImagenPelicula(id:any,nombre:string):Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.put(this.url+'/setImage/'+id+'/'+nombre,{headers:headers});
  }
  relacionarCategoria(object:any):Observable<any>{
    var json = JSON.stringify(object);
    console.log(json);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'/peliculaCategoria',json,{headers:headers});
  }
}

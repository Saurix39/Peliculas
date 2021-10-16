import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;
  public identity:any;
  constructor(private _http:HttpClient) { 
    this.url=environment.url;
  }
  login(usuario:Usuario):Observable<any>{
    var json = JSON.stringify(usuario);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.post(this.url+'/usuario',json,{headers:headers});
  }

  peliculasVistas(id:string):Observable<any>{
    var headers = new HttpHeaders().set("Content-Type","application/json");
    return this._http.get(this.url+'/peliculasVistas/'+id,{headers:headers});
  }

  getIdentity(){
    var identity = JSON.parse(localStorage.getItem('usuario')+'');
    if(identity && identity != null && identity != undefined){
      this.identity=identity;
    }else{
      this.identity=null;
    }
    return this.identity;
  }
}

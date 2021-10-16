import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PeliculaService } from '../core/services/pelicula.service';

@Component({
  selector: 'app-peliculas-xcategoria',
  templateUrl: './peliculas-xcategoria.component.html',
  styleUrls: ['./peliculas-xcategoria.component.css']
})
export class PeliculasXcategoriaComponent implements OnInit {
  public peliculas:any;
  public url:string;
  constructor(private _peliculaService:PeliculaService) { 
    this.peliculas=[];
    this.url=environment.url;
    this.atributes();
  }
  atributes(){
    this._peliculaService.getPeliculasXCat().subscribe(
      response=>{
        if(response && response.status=="success"){
          this.peliculas=response.valores;
        }else{
          console.log(response);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  ngOnInit(): void {
  }

}

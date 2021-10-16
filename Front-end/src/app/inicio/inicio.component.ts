import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CategoriaService } from '../core/services/categoria.service';
import { PeliculaService } from '../core/services/pelicula.service';
import { Busqueda } from '../models/busqueda';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public novedades:any;
  public peliculas:any;
  public busCategoria:any;
  public busqueda:Busqueda;
  public url:string;
  constructor(private _peliculaService:PeliculaService,
    private _categoriaService:CategoriaService) {
    this.url = environment.url;
    this.busqueda= new Busqueda("");
    this.novedades=[];
    this.peliculas=[];
    this.atributos();
  }

  atributos(){
    this._peliculaService.getNovedades().subscribe(
      response=>{
        if(response && response.status=="success"){
          this.novedades=response.list;
          this._peliculaService.getPeliculas().subscribe(
            response=>{
              if (response && response.status=="success"){
                this.peliculas=response.list;
              }else{
                console.log(response);
              }
            },
            error=>{
              console.log(<any>error);
            }
          );
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

  onSubmit(form:NgForm){
    if(this.busCategoria==true){
      this._categoriaService.buscarPorCategoria(this.busqueda.palabra).subscribe(
        response=>{
          if(response && response.status=="success"){
            this.novedades=[];
            this.peliculas=[];
            var list = response.list;
            for (let categoria of list){
              Array.prototype.push.apply(this.peliculas,categoria.peliculas)
            }
          }else{
            console.log(response);
          }
        },
        error=>{
          console.log(<any>error);
        }
      );
    }else{
      this._peliculaService.buscarPelicula(this.busqueda.palabra).subscribe(
        response=>{
          if(response && response.status=="success"){
            this.novedades=[];
            this.peliculas=[];
            this.peliculas = response.list;
          }else{
            console.log(response);
          }
        },
        error=>{
            console.log(<any>error);
        }
      );
    }
  }

}

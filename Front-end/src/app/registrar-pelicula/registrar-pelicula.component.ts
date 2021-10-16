import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CategoriaService } from '../core/services/categoria.service';
import { PeliculaService } from '../core/services/pelicula.service';
import { Categoria } from '../models/categoria';
import { Pelicula } from '../models/pelicula';

@Component({
  selector: 'app-registrar-pelicula',
  templateUrl: './registrar-pelicula.component.html',
  styleUrls: ['./registrar-pelicula.component.css']
})
export class RegistrarPeliculaComponent implements OnInit {
  public pelicula:Pelicula;
  public status:string;
  public url:string ="";
  public categorias:any;
  public categoriasRelacionar=Array;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: 50,
    uploadAPI:  {
      url:environment.url+'/pelicula-image',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    attachPinText:"Sube la caratula"
};
  constructor(private _peliculaService:PeliculaService, private _categoriaService: CategoriaService) { 
    this.pelicula= new Pelicula(1,"","","","","",new Date());
    this.url=environment.url;
    this.status="";
  }

  ngOnInit(): void {
    this._categoriaService.obtenerCategorias().subscribe(
      response=>{
        if(response && response.status=="success"){
          this.categorias=response.list;
        }else{
          console.log(response);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  onSubmit(form:NgForm){
    console.log(this.pelicula);
    this._peliculaService.guardarPelicula(this.pelicula).subscribe(
      response=>{
        if(response && response.status=="success"){
          this.pelicula=response.pelicula;
          this.status="success";
          console.log(response);
        }else{
          this.status="error";
          console.log(response);
        }
      },
      error=>{
        this.status="error";
        console.log(<any>error);
      }
    );
  }
  caratulaUpload(data:any){
    let data_obj = data.body
    this.pelicula.imagen=data_obj.nombre;
    this._peliculaService.setImagenPelicula(this.pelicula.id,data_obj.nombre).subscribe(
      response=>{
        if(response && response.status=="success"){
          console.log(response);
          this.status="success2";
        }else{
          console.log(response);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  selectChange(data:string){
    console.log(data);
    var categoria = this.categorias.filter(function(categoria:any){
      return categoria.id == data;
    });
    console.log(categoria);
    this.categorias = this.categorias.filter(function(categoria:any){
      return categoria.id != data;
    });
    var obj={
      id_pelicula_fk:this.pelicula.id+"",
      id_categoria_fk:data
    }
    this._peliculaService.relacionarCategoria(obj).subscribe(
      response=>{
        if(response && response.status=="success"){
          console.log(response);
        }else{
          console.log(response);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
    console.log(this.categoriasRelacionar);
  }

}

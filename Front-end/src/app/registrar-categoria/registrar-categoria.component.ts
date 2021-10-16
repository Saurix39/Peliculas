import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from '../core/services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css']
})
export class RegistrarCategoriaComponent implements OnInit {
  public categoria:Categoria;
  public status:string;
  constructor(private _categoriaService:CategoriaService) { 
    this.categoria=new Categoria(1,"");
    this.status="";
  }

  ngOnInit(): void {
  
  }
  onSubmit(form:NgForm){
    this._categoriaService.registrarCategoria(this.categoria).subscribe(
      response=>{
        if(response && response.status=="success"){
          this.status="success";
          form.reset();
        }else{
          console.log(response);
          this.status="error";
        }
      },
      error=>{
        console.log(<any>error);
          this.status="error";
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title:String;
  public status:String;
  public user:Usuario;
  constructor(private _userService:UsuarioService, private _router:Router) { 
    this.title="Autenticación";
    this.status="";
    this.user= new Usuario(1,"");
  }


  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this._userService.login(this.user).subscribe(
      response=>{
        if(response.status=="success"){
          this.user=response.usuario;
          var usuario = JSON.stringify(this.user);
          localStorage.setItem('usuario',usuario);
          this._router.navigate(['/usuario']);
        }else{
          console.log(response.error);
        }
      },
      error=>{
        if(error.error.message=="El usuario ya existe!!"){
          this.user=error.error.usuario;
          var usuario = JSON.stringify(this.user);
          localStorage.setItem('usuario',usuario);
          this._router.navigate(['/usuario']);
        }
      } 
    );
  }

}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UsuarioService } from '../core/services/usuario.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  public identity:any;
  public peliculasVistas:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _userService:UsuarioService) {
    this.identity=this._userService.getIdentity();
    this.peliculasVistas=[];
    this.atributos();
  }
  atributos(){
    this._userService.peliculasVistas(this.identity.id).subscribe(
      response=>{
        if(response && response.status=="success"){
          this.peliculasVistas=response.lista;
          console.log(this.peliculasVistas);
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

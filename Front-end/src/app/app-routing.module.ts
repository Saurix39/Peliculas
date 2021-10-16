import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginModule } from './login/login.module';
import { PeliculasXcategoriaComponent } from './peliculas-xcategoria/peliculas-xcategoria.component';
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';
import { RegistrarPeliculaComponent } from './registrar-pelicula/registrar-pelicula.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('./login/login.module').then(m => LoginModule)
  },
  {
    path:'usuario',
    component:LayoutComponent,
    children:[
      {
        path:'',
        component:InicioComponent
      },
      {
        path:'registrar-categoria',
        component:RegistrarCategoriaComponent
      },
      {
        path:'peliculas-por-categoria',
        component:PeliculasXcategoriaComponent
      },
      {
        path:'registrar-pelicula',
        component:RegistrarPeliculaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

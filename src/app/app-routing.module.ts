import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'catalog-component', canActivate: [AuthGuard], component: CatalogComponent},
  { path: 'catalog-component/:id', canActivate: [AuthGuard], component: MovieComponent},
  { path: '**', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

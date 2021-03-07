import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';

const routes: Routes = [
    {
        path:'listado-clientes', component: ListadoClientesComponent
    },
    {
        path:'agregar-cliente', component: AgregarClienteComponent
    },
    {
        path:'agregar-cliente/:clientId', component: AgregarClienteComponent
    },
    {
        path:'agregar-producto', component: AgregarProductoComponent
    },
    {
        path:'agregar-producto/:productId', component: AgregarProductoComponent
    },
    {
        path:'listado-productos', component: ListadoProductosComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

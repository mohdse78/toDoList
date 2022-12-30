import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {StoreComponent} from "./store/store.component";
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {BehziProductComponent} from "./behzi-product/behzi-product.component";

const routes: Routes = [
  {path: '', component: MyProjectsComponent},
  {path: 'store', component: StoreComponent},
  {path: 'todolist', component: ToDoListComponent},
  {path: 'behzi', component: BehziProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const ArrayOfComponents = [MyProjectsComponent, ToDoListComponent, StoreComponent, BehziProductComponent];

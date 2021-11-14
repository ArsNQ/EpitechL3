import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './mytest/test.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './Pages/HomePage/home.component';
import {ChatComponent} from './Pages/ChatPage/chat.component';
import {MyregisterComponent} from './Components/Register/myregister.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'test', component: TestComponent
  },
  {
    path: 'register', component: MyregisterComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

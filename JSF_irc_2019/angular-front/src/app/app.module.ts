import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyheaderComponent } from './Components/Header/myheader.component';
import { MysidebarComponent } from './Components/SideBar/mysidebar.component';
import { TestComponent } from './mytest/test.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MychatboxComponent } from './Components/ChatBox/mychatbox.component';
import { MyfooterComponent } from './Components/Footer/myfooter.component';
import { HomeComponent } from './Pages/HomePage/home.component';
import { ChatComponent } from './Pages/ChatPage/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
import { MyloginComponent } from './Components/Login/mylogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyonlineComponent } from './Components/Online/myonline.component';


import { ChatService } from '../chat.service';
import { MyregisterComponent } from './Components/Register/myregister.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    MyheaderComponent,
    MysidebarComponent,
    TestComponent,
    NotFoundComponent,
    TestComponent,
    MychatboxComponent,
    MyfooterComponent,
    HomeComponent,
    ChatComponent,
    MyloginComponent,
    MyonlineComponent,
    MyregisterComponent
  ],
    imports: [
        MatIconModule,
        MatSidenavModule,
        BrowserModule,
        AppRoutingModule,
        SocketIoModule.forRoot(config),
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

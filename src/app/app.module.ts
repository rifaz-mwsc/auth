import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// Routing
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Auth
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Adal8HTTPService, Adal8Service, Adal8Interceptor, Adal8User } from 'adal-angular8';
import { AuthGuard } from './core/services/adal-8/authentication.guard';
import { AuthService } from './core/services/auth/auth.service';
// Toastr
import { ToastrModule } from 'ngx-toastr';
// Modules
import { CoreModule } from './core/core.module';
import { OrchestraModule } from './orchestra/orchestra.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,                      // Imported-SysModule
    // RouterModule.forRoot(APP_ROUTES),   // Imported-SysModule
    // RouterModule,                       // Imported-SysModule
    HttpClientModule,                   // Imported-SysModule
    AppRoutingModule,     // Main Routings
        // ToastrModule.forRoot(),         // ToastrModule added
    // ToastrModule.forRoot({ timeOut: 4000, enableHtml: true }),
    ToastrModule.forRoot({
      // timeOut: 4000,
      // enableHtml: true,
      positionClass: 'toast-bottom-right'
    }),
    CoreModule,           // Core - Module
    OrchestraModule,      // Orchestra - Module
    SharedModule          // Shared - Module
  ],
  providers: [
    AuthGuard,
    AuthService,
    Adal8Service,
    // {
    //   provide: Adal8HTTPService,
    //   useFactory: Adal8HTTPService.factory,
    //   deps: [HttpClient, Adal8Service]
    // }, //  important! HttpClient replaces Http
    {
      provide: Adal8HTTPService,
      useFactory: Adal8HTTPService.factory,
      deps: [HttpClient, Adal8Service]
    }, //  important! HttpClient replaces Http
    // AuthGuard,
    // AuthContextService,
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

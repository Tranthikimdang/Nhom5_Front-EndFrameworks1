import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginModule} from "./login/login.module";
import {AuthComponent} from "./auth.component";
import {ThemeModule} from "../@theme/theme.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [
    AuthRoutingModule,
    // LoginModule,
    ThemeModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    // LoginComponent
  ]
})
export class AuthModule {
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth/auth.service";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { TokenInterceptor } from "./token.interceptor";
import { AuthGuard } from "./auth/auth.guard";
import { DefaultGuard } from "./default.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, AngularFirestoreModule],
  declarations: [],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    DefaultGuard
  ]
})
export class InfraModule {}

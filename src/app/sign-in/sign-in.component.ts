import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from "../infra/auth/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
    authService.user.subscribe(user => {
      if (user) {
        router.navigateByUrl("home");
      }
    });
  }

  ngOnInit() {}
}

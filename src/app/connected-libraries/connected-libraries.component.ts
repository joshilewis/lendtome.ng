import { Component, OnInit } from "@angular/core";
import { LendtomeService } from "../lendtome.service";
import { Observable } from "rxjs/Observable";
import { LibrarySearchResult } from "../dto/librarysearchresult";
import { Router } from "@angular/router";
import { Call_Status } from "../infra/call-status";
import { MatSnackBar } from "@angular/material";
import { Constants } from "../infra/contstants";

@Component({
  selector: "app-connected-libraries",
  templateUrl: "./connected-libraries.component.html",
  styleUrls: ["./connected-libraries.component.css"]
})
export class ConnectedLibrariesComponent implements OnInit {
  public Call_Status = Call_Status;
  public callStatus: Map<string, Call_Status>;
  constructor(
    public lendtomeService: LendtomeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.callStatus = new Map<string, Call_Status>();
  }

  ngOnInit() {}

  public acceptConnection(library: LibrarySearchResult): void {
    this.callStatus[library.id] = Call_Status.Pending;
    this.callStatus.set(library.id, Call_Status.Pending);
    this.lendtomeService
      .acceptConnection(library)
      .then(resolve => {
        this.snackBar.open(
          "Library connection accepted",
          "Ok",
          Constants.defaults.snackBarConfig
        );
        this.callStatus[library.id] = Call_Status.Success;
        // this.lendtomeService.refreshReceivedConnections)
      })
      .catch(err => console.log(err));
  }
}

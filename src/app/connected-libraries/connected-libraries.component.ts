import { Component, OnInit } from "@angular/core";
import { LendtomeService } from "../lendtome.service";
import { Observable } from "rxjs/Observable";
import { LibrarySearchResult } from "../librarysearchresult";
import { Router } from "@angular/router";

@Component({
  selector: "app-connected-libraries",
  templateUrl: "./connected-libraries.component.html",
  styleUrls: ["./connected-libraries.component.css"]
})
export class ConnectedLibrariesComponent implements OnInit {
  constructor(
    public lendtomeService: LendtomeService,
    private router: Router
  ) {}

  ngOnInit() {}

  public acceptConnection(library: LibrarySearchResult): void {
    this.lendtomeService
      .acceptConnection(library)
      .then(this.lendtomeService.refreshReceivedConnections)
      .catch(err => console.log(err));
  }
}

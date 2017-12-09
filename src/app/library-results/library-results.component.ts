import { Component, OnInit } from "@angular/core";
import { LibrarySearchResult } from "../dto/librarysearchresult";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";
import { LendtomeService } from "../lendtome.service";
import { Call_Status } from "../infra/call-status";
import { MatSnackBar } from "@angular/material";
import { Constants } from "../infra/contstants";

@Component({
  selector: "app-library-results",
  templateUrl: "./library-results.component.html",
  styleUrls: ["./library-results.component.css"]
})
export class LibraryResultsComponent implements OnInit {
  public libraries: Observable<LibrarySearchResult[]>;
  public searchTerm: string;
  public Call_Status = Call_Status;
  public callStatus: Map<string, Call_Status>;

  constructor(
    private route: ActivatedRoute,
    public lendtomeService: LendtomeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.searchTerm = this.route.snapshot.paramMap.get("searchTerm");
    this.libraries = lendtomeService.searchLibraries(this.searchTerm);
    this.callStatus = new Map<string, Call_Status>();
  }

  ngOnInit() {}

  public connectToLibrary(library: LibrarySearchResult): void {
    this.callStatus[library.id] = Call_Status.Pending;
    this.callStatus.set(library.id, Call_Status.Pending);
    this.lendtomeService
      .requestConnection(library)
      .then(res => {
        this.snackBar.open(
          "Library connection requested",
          "Ok",
          Constants.defaults.snackBarConfig
        );
        this.callStatus[library.id] = Call_Status.Success;
        // this.router.navigateByUrl("libraries");
      })
      .catch(err => console.log(err));
  }
}

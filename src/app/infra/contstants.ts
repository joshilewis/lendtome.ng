import { MatSnackBarConfig } from "@angular/material";

const defaultSnackBarConfig: MatSnackBarConfig = {
  verticalPosition: "top",
  duration: 3 * 1000
};

export const Constants = {
  keys: {
    libraryId: "libraryId"
  },
  defaults: {
    snackBarConfig: defaultSnackBarConfig
  }
};

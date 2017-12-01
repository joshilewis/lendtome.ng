import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  ViewChild
} from '@angular/core';
import { BarcodeDecoderService } from '../barcode-decoder.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent
  implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('interactive') interactive;

  constructor(
    private decoderService: BarcodeDecoderService,
    private dialogRef: MatDialogRef<BarcodeScannerComponent>
  ) {}

  ngOnInit() {
    this.decoderService.onLiveStreamInit();
    this.decoderService.onDecodeProcessed();

    this.decoderService
      .onDecodeDetected()
      .then(code => {
        this.decoderService.onDecodeStop();
        this.dialogRef.close(code);
      })
      .catch(err => console.log(err));
  }

  ngAfterContentInit() {
    this.interactive.nativeElement.children[0].style.position = 'absolute';
  }

  ngOnDestroy() {
    this.decoderService.onDecodeStop();
  }
}

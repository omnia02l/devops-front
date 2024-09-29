import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccountService } from 'src/app/core/services/account.service';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('qrScanner') qrScannerElement!: ElementRef<HTMLDivElement>;
  private html5QrcodeScanner?: Html5Qrcode;
  userRole: string | null = null;
  private scanAttempted: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private ticketService: TicketService
  ) {}

  ngAfterViewInit(): void {
    this.accountService.getPrincipal().subscribe({
      next: (principal) => {
        this.userRole = principal.role;
        if (this.userRole === 'coach') {
          this.startScanner();
        } else {
          this.displayError('You do not have permission to access this scanner.');
        }
      },
      error: (err) => this.displayError('Failed to obtain user role.')
    });
  }

  private onQrCodeSuccess(decodedText: string, decodedResult: any): void {
    try {
      const decodedData = JSON.parse(decodedText);
      const ticketId = decodedData.ticketId;
      if (this.userRole === 'coach') {
        this.ticketService.processTicket(ticketId).subscribe({
          next: () => this.snackBar.open(`Ticket processed successfully: ${decodedText}`, 'Close', { duration: 5000 }),
          error: (error) => this.displayError(`Failed to process the ticket: ${error.message}`)
        });
      }
    } catch (error) {
      this.displayError(`Error processing QR code: ${error}`);
    }
  }

  private startScanner(): void {
    if (!this.html5QrcodeScanner) {
      this.html5QrcodeScanner = new Html5Qrcode(this.qrScannerElement.nativeElement.id);
    }

    this.html5QrcodeScanner.start(
      { facingMode: "environment" }, // Camera setting
      { fps: 10, qrbox: 250 },
      this.onQrCodeSuccess.bind(this),
      this.onQrCodeError.bind(this)
    ).catch((err) => this.displayError(`Error starting scanner: ${err}`));
  }

  private onQrCodeError(errorMessage: string): void {
    this.snackBar.open('Failed to read QR Code. Please try again.', 'Close', { duration: 3000 });
  }

  ngOnDestroy(): void {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner.stop().catch((err) => console.error(`Error stopping the scanner: ${err}`));
    }
  }

  private displayError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
  }
}

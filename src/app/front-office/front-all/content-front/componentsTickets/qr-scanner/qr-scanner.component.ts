import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/core/services/account.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('qrScanner') qrScannerElement!: ElementRef<HTMLDivElement>;
  private html5QrcodeScanner?: Html5Qrcode;
  userRole: string | null = null;
  private isScanning: boolean = false;  // Track if scanning is active
  private isScanningBlocked: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private ticketService: TicketService,
    private router: Router
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

  private startScanner(): void {
    if (!this.html5QrcodeScanner) {
      this.html5QrcodeScanner = new Html5Qrcode(this.qrScannerElement.nativeElement.id);
    }
    this.isScanning = true;
    this.html5QrcodeScanner.start(
      
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText, decodedResult) => this.onQrCodeSuccess(decodedText, decodedResult),
      (errorMessage) => this.onQrCodeError(errorMessage)
    ).catch((err) => {
      console.error("Scanner initialization error:", err);
      this.displayError(`Error starting scanner: ${err}`);
      this.isScanning = false;  // Ensure we reset scanning state if we can't start the scanner
    });
  }

  private onQrCodeSuccess(decodedText: string, decodedResult: any): void {
    if (!this.isScanningBlocked) {
        this.isScanningBlocked = true;
        setTimeout(() => { this.isScanningBlocked = false; }, 3000);  // Unblock after 3 seconds

        const decodedData = JSON.parse(decodedText);
        const refTicket = decodedData.refTicket;
        if (!refTicket) {
            this.displayError("Reference ticket is missing from the QR code data.");
        } else if (this.userRole === 'coach') {
            this.ticketService.processTicket(refTicket).subscribe({
                next: (response) => {
                    console.log('Success response:', response);  // Log the success response
                    this.snackBar.open(`Ticket processed successfully: ${refTicket}`, 'Close', { duration: 5000 });
                },
                error: (error) => {
                    console.error('Error response:', error);  // Log detailed error information
                    if (error.status === 409) {
                        this.snackBar.open('Ticket already scanned.', 'Close', { duration: 5000 });
                    }else if(error.status === 200){
                      this.snackBar.open(`Ticket processed successfully: ${refTicket}`, 'Close', { duration: 5000 });
                      this.ngOnDestroy;
                    } else {
                        this.displayError(`Failed to process the ticket: ${error.error}`);
                    }
                }
            });
        }
    }
}


  private onQrCodeError(errorMessage: string): void {
    // Only display error if actively scanning
    if (this.isScanning) {
      this.snackBar.open('Failed to read QR Code. Please try again.', 'Close', { duration: 3000 });
    }
    this.isScanning = false;  // Reset scanning flag on error
  }

  ngOnDestroy(): void {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner.stop().catch((err) => {
        console.error(`Error stopping the scanner: ${err}`);
        this.isScanning = false;
        this.router.navigate(['/admin']);
      });
    }
  }

  private displayError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['snackbar-error'] });
  }
}

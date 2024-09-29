import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { Ticket } from 'src/app/core/models/ticket.model';
import { PurchaseTransactionService } from 'src/app/core/services/purchase-transaction.service';

@Component({
  selector: 'app-file-upload-ticket-dialog',
  templateUrl: './file-upload-ticket-dialog.component.html',
  styleUrls: ['./file-upload-ticket-dialog.component.css']
})
export class FileUploadTicketDialogComponent {
  selectedFile: File | null = null;
  qrDataList: string[] = [];
  message: string = '';
  isUploading: boolean = false;

  constructor(
    private qrCodeService: PurchaseTransactionService,
    private dialogRef: MatDialogRef<FileUploadTicketDialogComponent>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.isUploading = true;
      this.qrCodeService.uploadPDF(this.selectedFile).subscribe({
        next: (tickets) => {
          if (tickets.length === 0) {
            this.message = 'No tickets received.';
            this.snackBar.open(this.message, 'Close', { duration: 3000 });
            this.dialogRef.close();
            return;
          }
  
          // Utiliser forkJoin pour attendre la vérification de tous les billets
          forkJoin(
            tickets.map(ticket => 
              this.qrCodeService.checkTicketScanned(ticket.refTicket!)
                .pipe(
                  switchMap((isScanned) => {
                    if (isScanned) {
                      // Si le billet est scanné, vous pouvez retourner ou traiter d'autres informations ici
                      return of(ticket);
                    } else {
                      // Si le billet n'est pas scanné, vous pouvez décider de ne rien faire ou de traiter autrement
                      return of(null);
                    }
                  })
                )
            )
          ).subscribe(results => {
            const scannedTickets = results.filter(result => result !== null);
            if (scannedTickets.length > 0) {
              this.dialogRef.close();
              this.router.navigate(['/home/Voteperf']);
            } else {
              this.isUploading = false;
              this.dialogRef.close();
              this.message = "You do not have the rights to access this page yet.";
              this.snackBar.open(this.message, 'Close', { duration: 3000 });
            }
          });
        },
        error: (error) => {
          this.isUploading = false;
          console.error('Error during file upload:', error);
          this.message = 'Failed to upload file.';
          this.snackBar.open(this.message, 'Close', { duration: 3000 });
          this.dialogRef.close();
        }
      });
    }
  }
  
    
  
}

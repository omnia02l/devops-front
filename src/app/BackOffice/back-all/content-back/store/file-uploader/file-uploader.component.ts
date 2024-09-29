import * as LR from '@uploadcare/blocks';
//import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import { Component, CUSTOM_ELEMENTS_SCHEMA,ElementRef,NgModule,OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

LR.registerBlocks(LR);

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  styleUrls: ['./file-uploader.component.css']
})


export class FileUploaderComponent implements OnInit {
  
 // blocksStyles = blocksStyles;
 @ViewChild('ctxProvider', { static: true }) ctxProvider!: ElementRef<
 typeof LR.UploadCtxProvider.prototype
>;
uploadedFiles: LR.OutputFileEntry[] = [];

ngOnInit(): void {
 this.ctxProvider.nativeElement.addEventListener(
   'data-output',
   this.handleUploadEvent
 );
 this.ctxProvider.nativeElement.addEventListener(
   'done-flow',
   this.handleDoneFlow
 );
}

handleUploadEvent = (e: Event) => {
 if (!(e instanceof CustomEvent)) {
   return;
 }

 if (e.detail) {
   this.uploadedFiles = e.detail as LR.OutputFileEntry[];
 }
};

handleDoneFlow = () => {
 console.log('handleDoneFlow');
};
}
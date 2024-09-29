import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadTicketDialogComponent } from './file-upload-ticket-dialog.component';

describe('FileUploadTicketDialogComponent', () => {
  let component: FileUploadTicketDialogComponent;
  let fixture: ComponentFixture<FileUploadTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadTicketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

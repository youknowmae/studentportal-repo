import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../authentication-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../api-service.service';

import { response } from 'express';


@Component({
  selector: 'app-qrmodal',
  templateUrl: './qrmodal.component.html',
  styleUrls: ['./qrmodal.component.scss']
})
export class QrmodalComponent {
  showModal: boolean = false;
  user: any;

  constructor(
    private dialogRef: MatDialog, 
    private authService: AuthenticationService,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    // Subscribe to user$ observable from AuthenticationService
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }

}

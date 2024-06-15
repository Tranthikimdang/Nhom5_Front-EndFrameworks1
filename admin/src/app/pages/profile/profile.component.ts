import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_KEY } from 'app/@core/config';
import { LocalStorageService } from 'app/@core/services/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userInfo: any;

  constructor(private storageService: LocalStorageService) {}

  ngOnInit(): void {
    const userInfoString = this.storageService.getItem(LOCALSTORAGE_KEY.userInfo);
    if (userInfoString && typeof userInfoString === 'string') {
      this.userInfo = JSON.parse(userInfoString);
    }
  }
}

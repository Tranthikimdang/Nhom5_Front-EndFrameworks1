import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { LOCALSTORAGE_KEY } from 'app/@core/config';
import { LocalStorageService } from 'app/@core/services/common';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {LayoutService} from "../../../@core/services/common/layout.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  userInfo: any;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit() {
    const userInfoString = this.storageService.getItem(LOCALSTORAGE_KEY.userInfo);
    if (userInfoString && typeof userInfoString === 'string') {
      this.userInfo = JSON.parse(userInfoString);
    }
    this.currentTheme = this.themeService.currentTheme;
    this.user = {name: 'Alibaba', picture: 'assets/images/account.png'}
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
        .pipe(
            map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
            takeUntil(this.destroy$),
        )
        .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
        .pipe(
            map(({ name }) => name),
            takeUntil(this.destroy$),
        )
        .subscribe(themeName => this.currentTheme = themeName);
  }
  isUserMenuOpen: boolean = false;
  isDropdownOpen: boolean = false;

  onOptionSelected(option: string): void {
    console.log('Selected option:', option);
    console.log("dssccsđs");
    
  }
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }




  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(){
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}

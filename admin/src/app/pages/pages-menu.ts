import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
},
  {
      title: 'Products',
      icon: 'cube-outline',
      link: '/pages/products',
  },
  {
      title: 'Categories',
      icon: 'layers-outline',
      link: '/pages/categories',
  },
  {
      title: 'Users',
      icon: 'people-outline',
      link: '/pages/users',
  },
  {
      title: 'Orders',
      icon: 'clipboard-outline',
      link: '/pages/orders',
  },
  {
      title: 'Comments',
      icon: 'message-square',
      link: '/pages/comments',
  },
  {
      title: 'Statistics',
      icon: 'bar-chart-outline',
      link: '/pages/statistics',
  },
  {
    title: 'Authentication',
    icon: 'calendar-outline',
    children:[
            {
                title: 'profile',
                icon: 'book-outline',
                link: '/pages/profile',
            },
            {
              title: 'Log out',
              icon: 'repeat-outline',
              link: '/',
          },
          
          ]
}

];

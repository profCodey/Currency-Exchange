// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Tenants',
    icon: 'fluent:people-money-20-filled',
    children: [
      {
        icon: 'fluent:people-money-20-filled',
        title: 'Tenant List',
        path: '/tenants'
      },
      {
        icon: 'ant-design:usergroup-add-outlined',
        title: 'Add New Tenant',
        path: '/tenants/add-new-tenant'
      },
    ]
  },
  {
    title: 'Transactions',
    icon: 'uil:transaction',
    children: [
      {
        icon: 'icon-park-outline:transaction-order',
        title: 'Transaction List',
        path: '/transactions/transaction-list'
      },
      {
        title: 'Rate Setup',
        path: '/transactions/rate-setup',
        icon: 'iconoir:fx-tag'
      },
    ]
  },
  {
    title: 'Parameters',
    icon: 'ant-design:control-outlined',
    children: [
      {
        icon: 'basil:bank-outline',
        title: 'Bank List',
        path: '/parameters/bank-list'
      },
      {
        icon: 'formkit:multicurrency',
        title: 'Currencies',
        path: '/parameters/currencies'
      },
      
      {
        icon: 'solar:banknote-outline',
        title: 'Offline Account',
        path: '/parameters/offline-account-details'
      },
      {
        icon: 'ep:money',
        title: 'Purposes',
        path: '/parameters/purposes'
      },
      {
        icon: 'carbon:category',
        title: 'Partner Category',
        path: '/parameters/partner-category',
      },
    ]
  },
  {
    title: 'Agent Commission',
    path: '/agent-commission',
    icon: 'system-uicons:users'
  },
  {
    title: 'Compliance',
    icon: 'carbon:ibm-cloud-security-compliance-center',
    children: [
      {
        icon: 'ph:globe',
        title: 'Global Limit',
        path: '/compliance/global-limit'
      },
      {
        icon: 'la:user-cog',
        title: 'User Limit',
        path: '/compliance/user-limit'
      },
    ]
  },
  {
    title: 'Notification',
    icon: 'iconamoon:notification',
    children: [
      {
        icon: 'basil:notification-on-outline',
        title: 'Rate Notification',
        path: '/notification/rate-notification'
      },
      {
        icon: 'ant-design:notification-outlined',
        title: 'Announcement ',
        path: '/notification/announcement'
      }
    ]
  },

  {
    title: 'User Management',
    icon: 'clarity:user-line',
    children: [
      {
        icon: 'ph:users-three',
        title: 'User List',
        path: '/user-management/user-list'
      },
      {
        icon: 'wpf:usershield',
        title: 'Permission',
        path: '/user-management/permission'
      },
      {
        icon: 'oui:app-users-roles',
        title: 'Roles',
        path: '/user-management/roles'
      }
    ]
  }

  // {
  //   title: 'Second Page',
  //   path: '/second-page',
  //   icon: 'tabler:mail',
  // },
  // {
  //   path: '/acl',
  //   action: 'read',
  //   subject: 'acl-page',
  //   title: 'Access Control',
  //   icon: 'tabler:shield',
  // },
]

export default navigation

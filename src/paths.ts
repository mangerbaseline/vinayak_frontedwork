// import { request } from "http";

// export const paths = {
//   home: '/',
//   auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
//   dashboard: {
//     overview: '/dashboard',
//     account: '/dashboard/account',
//     customers: '/dashboard/customers',
//     integrations: '/dashboard/integrations',
//     settings: '/dashboard/settings',
//     userlist: '/dashboard/userlist',
//     summery:'/dashboard/summary',
//     alluser:'./dashboard/alluser',
//     request:'./dashboard/request',
//   },
//   errors: { notFound: '/errors/not-found' },
// } as const;



export const paths = {
  home: '/',

  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
  },

  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    userlist: '/dashboard/userlist',
    summery: '/dashboard/summary',
    alluser: '/dashboard/alluser',    
    request: '/dashboard/request',     
  },

  errors: {
    notFound: '/errors/not-found',
  },
} as const;

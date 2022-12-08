export default [

  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import("@/yicpages/admin/StockInventory/dashboard.vue"),
    meta: {
      layout: "full",
      authReq: true,

    },
  },

  {
    path: '/createUsers',
    name: 'createUsers',
    component: () => import("@/yicpages/admin/StockInventory/createUsers.vue"),
    meta: {
      layout: 'full',
      authReqAdmin: true,
      authReq: true,


    },
  }






]

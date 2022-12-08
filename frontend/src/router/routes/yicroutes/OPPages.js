export default [

  
	
  
	{
	  path: '/opEntry',
	  name: 'opEntry',
	  component: () => import("@/yicpages/admin/StockInventory/entry.vue"),
	  meta: {
		layout: 'full',
		authReq: true,
  
	  },
	},
	{
		path: '/adminOp/list',
		name: 'adminOp-list',
		component: () => import("@/yicpages/admin/StockInventory/adminOpUserList.vue"),
		meta: {
		  layout: 'full',
		  authReq: true,
	
		},
	  },
	  {
		path: '/adminOp/configure',
		name: 'adminOp-configure',
		component: () => import("@/yicpages/admin/StockInventory/adminOpUserConfig.vue"),
		meta: {
		  layout: 'full',
		  authReq: true,
	
		},
	  },
	   {
		path: '/adminOp/passbook',
		name: 'adminOp-passbook',
		component: () => import("@/yicpages/admin/StockInventory/adminOpUserPassbook.vue"),
		meta: {
		  layout: 'full',
		  authReq: true,
	
		},
	  },
	
	
	
	
  
  
  
  
  
  
  ]
  
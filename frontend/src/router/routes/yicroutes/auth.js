export default [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/yicpages/admin/StockInventory/login.vue'),
		meta: {
			layout: "full",
			authReq: false
		  },
	},
	
]
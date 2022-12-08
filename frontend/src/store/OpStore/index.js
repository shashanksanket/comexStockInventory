import Vue from 'vue'
import Vuex from 'vuex'

import feathersClient from '../../feathers-client'

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {
		Data: '',
		AllOPusers: {},
		optionsAllOPusers: [],
		OpUserDetails: '',
		OpConfigData: '',
		paymentData: '',
		OpUserDetailsPassbook: []
	},
	getters: {

	},
	mutations: {
		
		
	},
	actions: {
		addOpBill: async ({commit,state},payload)=>{
			await feathersClient.service('/api/opStocks').create({
				Title: payload.Title,
				amountSpent: payload.amountSpent,
				DateOfPayment: payload.DateOfPayment
			})
		},
		searchOpBillData: async ({commit,state})=>{
			const res = await feathersClient.service('/api/opStocks').find({
				query:{
					$total: true
				}
			})
			state.Data = res
		},
		delete: async ({commit,state},payload) => {
			await feathersClient.service('/api/opStocks').remove(payload.id)
		},
		allOpUsers: async ({commit,state},payload) => {
			state.optionsAllOPusers = []
			const res = await feathersClient.service('/api/users').find({
				query: {
					role: 'OPUSER',
					$total : true
				}
			})
			for (var i=0; i<res.length; i++){
				let name = res[i].firstName  
				state.AllOPusers[name] = res[i].id
				state.optionsAllOPusers.push(res[i].firstName)

			}

		},
		getOpUserDetails: async ({commit,state},payload) => {
			state.OpUserDetails = ''
			const res = await feathersClient.service('/api/opStocks').find({
				query:{
					$total: true,
					userId: state.AllOPusers.payload
				}
			})
	

			state.OpUserDetails = res

		},
		deleteOpBill: async ({commit,state},payload) => {
			await feathersClient.service('/api/opStocks').remove(payload.id)
		},
		deleteOpConfig: async ({commit,state},payload) => {
			await feathersClient.service('/api/opConfigs').remove(payload.id)
		},
		getPayment: async ({commit,state},payload) => {
			state.paymentData = ''
			if (payload){
				const res = await feathersClient.service('/api/Opconfigs').find({
					query:{
					userId: state.AllOPusers.payload
					}

				})
				state.paymentData = res.data

			}
			else{

				const res = await feathersClient.service('/api/Opconfigs').find({
					query:{
					}
				})
				state.paymentData = res.data
			}
		},
		
		setOpUserConfig: async ({commit,state},payload) => {
			const res = await feathersClient.service('/api/opConfigs').find({
				query:{
					Name: payload.Name
				}
			})
			let name= payload.Name
			if (!res.data[0]){

				await feathersClient.service('/api/opConfigs').create({
					Name: payload.Name,
					totalAmountGiven: parseInt(payload.totalAmountGiven),
					userId: state.AllOPusers[name]
				})
			}else{
				let previousAmount = parseInt(res.data[0].totalAmountGiven)
				await feathersClient.service('/api/opConfigs').patch(res.data[0].id,{
					totalAmountGiven: parseInt(payload.totalAmountGiven) + previousAmount,
					userId: state.AllOPusers[name],
					amountGiven: payload.totalAmountGiven
				})
			}
		},
		
		getOpUserConfig: async ({commit,state}) => {
			const res = await feathersClient.service('/api/opConfigs').find({
				query:{
					$total:true,
					userId: state.AllOPusers[name]

				}
			})
			state.OpConfigData = res
		},
		addUser: async ({commit,state},payload)=>{
			if (payload.currRole!='ENDUSER'){
				await feathersClient.service('/api/users').create({
					firstName: payload.firstName,
					lastName: payload.lastName,
					phoneNumber: payload.phoneNumber,
					password: payload.password,
					role: payload.role,
					email: payload.email,
				})
			}
		},
		getOpUserDetailsPassbook: async ({commit,state}, payload) => {
			const res = await feathersClient.service('/api/oppaymentdetails').find({
				query:{
					$total: true,
					userId: state.AllOPusers.payload
				}
			})
			state.OpUserDetailsPassbook = res
		}


	},
}

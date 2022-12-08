
<template style="z-index:1000; margin-top:200px;">
	<div>
		<Navbar />
		<div>
			<div class="root5" style="">
				<template>
					<div class="d-flex justify-content-between align-items-center ">
						<h2>
							<center>operational users list</center>
							<br />

						</h2>


					</div>
					<b-form-group class="input" id="fieldset-14" label="Select User" label-for="input-14">
							<b-form-select :options="optionsAllOPusers" v-model="searchQueryUserOp"
								class="d-inline-block mr-1"/>
						</b-form-group>
				</template>
				<div class="configData">
					<b-button @click="search" variant="primary">
						Search
					</b-button>
					<div class="d-flex justify-content-between">

						<h3>
							All payments given to user {{this.opUserName}}
						</h3>
						<p v-if="((role=='ADMIN' || role=='SUPERADMIN') && paymentData)"  style=""> <img src="../credit-card.svg" size="16" class="align-middle text-body" />     ₹ {{paymentData[0].totalAmountLeft}} </p>
					</div>

					<b-table :current-page="currentPage" id="table" :per-page="perPage" style="width:100%;" ref="data" class="position-relative" :items="OpUserDetailsPassbook" responsive
					:fields="tableColumns" primary-key="id" show-empty empty-text="No matching records found">
					<template #cell(data)="data">

					</template>
						
					</b-table>
					<b-pagination
	  v-model="currentPage"
	  :total-rows="OpUserDetailsPassbook.length"
	  :per-page="perPage"
	  aria-controls="table"
	></b-pagination>
				</div>
			</div>
			<v-idle
  @idle="onidle" style="display:none" 
  :duration="900" />
		</div>
	</div>
</template>
<script>
import Vidle from 'v-idle'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BPagination,BInput, BDropdown,BDropdownItem, BTable,  BModal, BForm, BFormFile, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormSelect,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'
import Navbar from '../Navbar.vue'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { mapMutations, mapActions, mapState } from "vuex";
import Password from "vue-password-strength-meter";
import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    smallDevices: 600,
    mediumDevices: 1200,
    largeDevices: Infinity,
  }
})

export default {
	components: {
		BSidebar,
		BForm,
		BInput,
		BDropdownItem,
		BFormSelect,
		BFormFile,
		BFormGroup,
		BFormInput,
		BFormInvalidFeedback,
		BButton,
		vSelect,
		BModal,
		Navbar,
		BDropdown,
		BPagination,
		// Form Validation
		ValidationProvider,
		ValidationObserver,
		VuePhoneNumberInput,
		Password,
		BTable
	},
	model: {

	},
	props: {


	},
	data() {
		return {
			currentPage : 1,
			perPage: 10,
			opUserName: '',
			Title: '',
			amountSpent: 0,
			DateOfPayment: '',
			success: false,
			startRange: 0,
			searchQueryUserOp: '',
			endRange: 0,
			tableColumns: [
				{ key: 'paymentAmount' },
				{ key: 'paymentDate' },
				{ key: 'updatedBalance' },
			],
			
		}
	},
	methods: {
		...mapActions({
			getOpUserDetailsPassbook: "Opstore/getOpUserDetailsPassbook",
			deleteOpBill: "Opstore/deleteOpBill",
			logoutUser: "auth/logoutUser",
			allOpUsers: "Opstore/allOpUsers",
			getPayment: "Opstore/getPayment",

		}),
		async search(){
			await this.getOpUserDetailsPassbook(this.searchQueryUserOp)

		    await this.getPayment(this.searchQueryUserOp)
			this.opUserName = this.searchQueryUserOp
			this.reset()
			this.success = true
		},
		onidle(){
      alert('You have been logged out due to inactivity of 15 minutes')
      this.$router.push({ name: "login" });
      this.logoutUser();
    },
		
		reset() {
			this.searchQueryUserOp= ''
			
		},
		async deleteBill(val){
			await this.deleteOpBill({id: val, role: this.role})
			await this.getOpUserDetails(this.searchQueryUserOp)
		}
	},
	async mounted(){
		await this.allOpUsers()
	},
	computed: {
		...mapState({
			
			OpUserDetailsPassbook: (state) => {
				return state.Opstore.OpUserDetailsPassbook
			},
			role: (state) => {
				return state.auth.currUser.role
			},
			optionsAllOPusers: (state) => {
				return state.Opstore.optionsAllOPusers
			},
			paymentData: (state) => {
				return state.Opstore.paymentData
			}
		}),
	},

}

</script>
<style lang="scss">

.form {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	width: auto;
}
.configData{
	margin: 1.5%;
	
}
.configData button{
	margin-bottom: 1.5%;
	
}
.root5{
	padding: 30px 46px !important;
gap: 5px;

// width: 80%;
// height: 1122px;
// left: 54px;
// top: 168.02px;

margin-top: 25px;
margin-left: 30px;
margin-right: 30px;
margin-bottom: 30px;

background: #FFFFFF;
box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
border-radius: 10px;
}
</style>
	
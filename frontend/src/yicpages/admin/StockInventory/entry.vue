
<template style="z-index:1000; margin-top:200px;">
	<div>
		<Navbar />
		<div>
			<div class="root5" style="">
				<template>
					<div class="d-flex justify-content-between align-items-center ">
						<h2>
							<center>Individual Expenses</center>
							<br />

						</h2>


					</div>
					<validation-observer ref="registerForm">
						<b-form class="form" @submit.prevent>

							<b-form-group style="margin:10px; display: flex; flex-direction: column;" id="fieldset-1" label="Title"
								label-for="input-1">
								<b-form-input id="input-2" v-model="Title">
								</b-form-input >
							</b-form-group>
							<b-form-group style=" margin:10px; display: flex; flex-direction: column;" id="fieldset-1" label="Amount Spent"
								label-for="input-1">
								<b-form-input type="number" id="input-2" v-model="amountSpent"></b-form-input>
							</b-form-group>
							<b-form-group  style=" margin:10px; display: flex; flex-direction: column;" id="fieldset-7" label="Date Of Payment"
		label-for="input-7" >
		
		<b-form-input style="" type="date" id="" v-model="DateOfPayment" ></b-form-input>
		
	</b-form-group>
							<b-button v-if="($mq === 'largeDevices' || $mq === 'mediumDevices')" type="submit" variant="primary" @click="onSubmit()"
								style="margin: 20px; width:300px">Submit</b-button>
							<b-button v-if="($mq === 'smallDevices')" type="submit" variant="primary" @click="onSubmit()"
								style="margin: auto; width:=100%">Submit</b-button>


						</b-form>
						<b-modal ok-only v-model="success">
							<p v-if="error">{{ error }}</p>
							<p v-else>Your Data is uploaded!</p>
						</b-modal>
					</validation-observer>
				</template>
				<div class="configData">
					<b-button @click="search" variant="primary">
						Search All Previous Amount Spent
					</b-button>
					<b-pagination
      v-model="currentPage"
      :total-rows="OpBillData.length"
      :per-page="perPage"
      aria-controls="table"
    ></b-pagination>
					<b-table :current-page="currentPage" id="table" :per-page="perPage" style="width:100%;" ref="data" class="position-relative" :items="OpBillData" responsive
						:fields="tableColumns" primary-key="id" show-empty empty-text="No matching records found">
						<template #cell(data)="data">

						</template>
						<template  #cell(Actions)="data">

							<b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

								<template #button-content>
									<img src="./more-vertical.svg" size="16" class="align-middle text-body" />
								</template>
								

								<b-dropdown-item v-if="(role!='ENDUSER' && role!='OPUSER')" @click="deleteBill(data.item.id)">
									<img src="./trash.svg" size="16" class="align-middle text-body" />

									<span class="align-middle ml-50">Delete</span>
								</b-dropdown-item>
							</b-dropdown>
						</template>
					</b-table>
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
			Title: '',
			amountSpent: 0,
			DateOfPayment: '',
			success: false,
			startRange: 0,
			endRange: 0,
			tableColumns: [
				{ key: 'Title' },
				{ key: 'amountSpent' },
				{ key: 'DateOfPayment' },
				{ key: 'Actions' },
			],
		}
	},
	methods: {
		...mapActions({
			addOpBill: "Opstore/addOpBill",
			searchOpBillData: "Opstore/searchOpBillData",
			delete: "Opstore/delete",
			getPayment: "Opstore/getPayment",
			logoutUser: "auth/logoutUser"
		}),
		async search(){
			await this.searchOpBillData()
		},
		onidle(){
      alert('You have been logged out due to inactivity of 15 minutes')
      this.$router.push({ name: "login" });
      this.logoutUser();
    },
		async onSubmit() {
			await this.addOpBill({ Title: this.Title, amountSpent: this.amountSpent, DateOfPayment: this.DateOfPayment});
			this.reset()
			this.success = true
			await this.searchOpBillData()
		},
		reset() {
			this.Title= '',
			this.amountSpent= 0,
			this.DateOfPayment= ''
		},
		async deleteBill(val){
			await this.delete({id: val, role: this.role})
			await this.searchOpBillData()
		}
	},
	async mounted(){
		await this.getPayment()
	},
	computed: {
		...mapState({
		
			OpBillData: (state) => {
				return state.Opstore.Data
			},
			role: (state) => {
				return state.auth.currUser.role
			},
			
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
	padding: 20px 16px !important;
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
	

<template style="z-index:1000; margin-top:200px;">
	<div>
		<Navbar />
		<div>
			<div class="root5" style="">
				<template>
					<div class="d-flex justify-content-between align-items-center ">
						<h2>
							<center>Operational Users Config</center>
							<br />

						</h2>


					</div>
					<b-form @submit.prevent="submit">

						<b-form-group class="input" id="fieldset-14" label="Select User" label-for="input-14">
								<b-form-select :options="optionsAllOPusers" v-model="searchQueryUserOp"
									class="d-inline-block mr-1"/>
							</b-form-group>
							<b-form-group class="input" id="fieldset-14" label="Amount Given" label-for="input-14">
								<b-form-input type="number" :options="optionsAllOPusers" v-model="totalAmountGiven"
									class="d-inline-block mr-1"/>
							</b-form-group>
							<b-button class="my-3"  type="submit" variant="primary">Submit</b-button>
					</b-form>
					<b-button variant="primary" @click="refresh()">Refresh</b-button>
				</template>
				<div class="configData">
					
					<h2 class="text-center ">All OPs config</h2>
					<b-table :current-page="currentPage" id="table" :per-page="perPage" style="width:100%; margin-top: 	40px;" ref="data" class="position-relative" :items="OpConfigData" responsive
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
					<b-pagination
      v-model="currentPage"
      :total-rows="OpConfigData.length"
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
			totalAmountGiven: 0,
			success: false,
			startRange: 0,
			searchQueryUserOp: '',
			endRange: 0,
			tableColumns: [
				{ key: 'Name' },
				{ key: 'totalAmountGiven' },
				{ key: 'totalAmountLeft' },
				{ key: 'totalAmountLeft' },
				{ key: 'lastUpdateAt' },
				{ key: 'Actions'}


			],
			
		}
	},
	methods: {
		...mapActions({
			getOpUserConfig: "Opstore/getOpUserConfig",
			deleteOpConfig: "Opstore/deleteOpConfig",
			logoutUser: "auth/logoutUser",
			allOpUsers: "Opstore/allOpUsers",
			setOpUserConfig: "Opstore/setOpUserConfig",
			getPayment: "Opstore/getPayment",

			
		}),
		async submit(){
			await this.setOpUserConfig({Name:this.searchQueryUserOp, totalAmountGiven: this.totalAmountGiven})
			this.reset()
			this.success = true
			await this.getOpUserConfig()

		},
		onidle(){
      alert('You have been logged out due to inactivity of 15 minutes')
      this.$router.push({ name: "login" });
      this.logoutUser();
    },
		async refresh(){
			await this.getOpUserConfig()

		},
		reset() {
			this.searchQueryUserOp= '',
			this.totalAmountGiven =''
			
		},
		async deleteBill(val){
			await this.deleteOpConfig({id: val, role: this.role})
			await this.getOpUserConfig(this.searchQueryUserOp)
		}
	},
	async mounted(){
		await this.getOpUserConfig()
		await this.allOpUsers()
	},
	computed: {
		...mapState({
			
			OpConfigData: (state) => {
				return state.Opstore.OpConfigData
			},
			role: (state) => {
				return state.auth.currUser.role
			},
			optionsAllOPusers: (state) => {
				return state.Opstore.optionsAllOPusers
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
	
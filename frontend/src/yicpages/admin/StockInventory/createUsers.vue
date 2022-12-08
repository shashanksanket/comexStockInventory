
<template style="z-index:1000; margin-top:200px;">
	<div>
		<Navbar />
		<div>
			<div class="root1">
				<template>
					<div>
						<br />
						<br />
						<h2 class="mainTitle ">
							Create New User
						</h2>
			</div>
			<validation-observer ref="registerForm">
				<b-form class="form" @submit.prevent>
				<br/>
				
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Firstname"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="firstName"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Lastname"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="lastName"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Email"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="email"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Contact Number"
					label-for="input-4" >
					<b-form-input id="input-4" v-model="phoneNumber"  ></b-form-input>
				</b-form-group>
				<b-form-group style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Password"
					label-for="input-4" >
					<b-form-input type="password" id="input-4" v-model="password"></b-form-input>
				</b-form-group>
				<b-form-group v-if="currRole==='ADMIN'" style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Role"
					label-for="input-4" >
					<b-form-select :options="['ENDUSER','OPUSER']"  id="input-4" v-model="role"  ></b-form-select>
				</b-form-group>
				<b-form-group v-if="currRole==='SUPERADMIN'" style=" display: flex; flex-direction: column;" id="fieldset-4" label="Enter Role"
					label-for="input-4" >
					<b-form-select :options="['ENDUSER','ADMIN','OPUSER']"  id="input-4" v-model="role"  ></b-form-select>
				</b-form-group>
			
			
			
				<b-button type="submit" variant="primary" @click="onSubmit()" style=" width:150px">Submit</b-button>
			
			<div>

							</div>

						</b-form>
						<br/><br/>
						<div>
							<b-table style="width:100%;" ref="data" class="position-relative" :items="totalUsers" responsive
						:fields="tableColumns" primary-key="id" show-empty empty-text="No users found">
						<template #cell(title)="data">

						</template>
						
					</b-table>
						</div>
						<b-modal ok-only v-model="success">
							<!-- <p v-if="error">{{ error }}</p> -->
							<p>Your user is Created!</p>
						</b-modal>
					</validation-observer>
					
				</template>
				
			<v-idle
  @idle="onidle" style="display:none" 
  :duration="900" />
			<br />
		</div>
	</div>
	</div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BModal, BForm, BFormFile, BTable, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormSelect, BFormDatepicker
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
import Vidle from 'v-idle'
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
		Vidle,
		BForm,
		BFormSelect,
		BTable,
		BFormFile,
		BFormGroup,
		BFormInput,
		BFormInvalidFeedback,
		BButton,
		vSelect,
		BModal,
		Navbar,
		BFormDatepicker,
		// Form Validation
		ValidationProvider,
		ValidationObserver,
		VuePhoneNumberInput,
		Password
	},
	model: {

	},
	props: {


	},
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			password: '',
			role: '',
			tableColumns: [
				{'key':'firstName'},
				{'key':'lastName'},
				{'key':'role'},
				{'key':'email'},
				{'key':'phoneNumber'},


			]
		}
	},
	async mounted() {
		await this.getUsers()
	},
	methods: {
		...mapActions({
			logoutUser: "auth/logoutUser",
			getUsers: "auth/getUsers",
			addUser: "Opstore/addUser"

		}),
		
		onidle(){
      alert('You have been logged out due to inactivity of 15 minutes')
      this.$router.push({ name: "login" });
      this.logoutUser();
    },
		async onSubmit() {
			await this.addUser({currRole: this.currRole, firstName: this.firstName, lastName: this.lastName, email: this.email, phoneNumber: this.phoneNumber, password: this.password, role: this.role})
			this.success = true
			this.reset()
		await this.getUsers()

		},
		reset() {
			this.firstName= '',
			this.lastName= '',
			this.email= '',
			this.phoneNumber= '',
			this.password= '',
			this.role= ''
		}
	},
	computed: {
		...mapState({
			
			currRole: (state) => {
				return state.auth.currUser.role;
			},
			totalUsers: (state) => {
				return state.auth.totalUsers
			}
			

		}),
	},

}

</script>
<style lang="scss">

.form div {
	display: flex;
	flex-direction: row;

}

.title {
	width: 171px;
	height: 28px;

	font-family: 'Mulish';
	font-style: normal;
	font-weight: 600;
	font-size: 22px;
	line-height: 28px;
	/* identical to box height */

	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: 0.2px;

	color: #000000;
}

.root1 {
	padding: 30px 86px;
	gap: 8px;

	// width: 80%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 15px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.mainTitle {
	width: 262px;
	height: 38px;

	font-family: 'Mulish';
	font-style: normal;
	font-weight: 600;
	font-size: 30px;
	line-height: 38px;
	/* identical to box height */
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: 0.2px;

	color: #ab7ef8;

}

@media screen and (max-width: 1000px) {
	.root1 {
		padding: 45px 46px;
		gap: 4px;
		width: 80%;
		margin: auto;
	}
.mainTitle {
	width: 100%;
	margin: auto !important;
}
.mainTitle h2{
	width: 100% !important;
	margin: auto;
}
	.formgroup {
		display: flex;
		flex-direction: column;
	}

	.formgroup .input {
		width: 100px !important;
		margin: auto !important;
	}
}
</style>
	
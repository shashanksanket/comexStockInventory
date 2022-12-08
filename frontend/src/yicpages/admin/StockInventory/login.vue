
<template >
	<div>
		<Navbar />
		<div class="rootLogin">

			<template>
				<div class="d-flex justify-content-between align-items-center ">
					<h5 class="mainTitle">
						Login To Portal
					</h5>
				</div>
				<div>
					<b-form @submit.prevent="login()">
						<small variant="danger">{{ errors }}</small>
						<b-form-group style="" id="fieldset-9" label="Enter Your Username" label-for="input-9">
							<b-form-input type="username" id="input-1" v-model="userName"></b-form-input>
						</b-form-group>
						<b-form-group style="" id="fieldset-9" label="Enter Your Password" label-for="input-9">
							<b-form-input type="password" id="input-2" v-model="password"></b-form-input>
						</b-form-group>
						<b-button type="submit" variant="primary"
							style="margin-top: 20px; width: 100%;">Submit</b-button>
					</b-form>
				</div>
				<b-modal ok-only v-model="success">

				</b-modal>
			</template>


		</div>

	</div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BModal, BForm, BFormFile, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
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
// import { jsonToCSV } from 'vue-papaparse'

export default {
	components: {
		BSidebar,
		BForm,
		BFormFile,
		BFormGroup,
		BFormInput,
		BFormInvalidFeedback,
		BButton,
		vSelect,
		BModal,
		Navbar,

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
			success: false,
			userName: '',
			Password: ''
		}
	},
	computed: {
		...mapState({
			errors: (state) => {
				return state.auth.errors;
			},
			isAuthenticated: (state) => {
				return state.auth.isAuthenticated
			},

		}),
	},
	methods: {
		...mapMutations({ setAuthPayload: "auth/SET_AUTHPAYLOAD" }),

		...mapActions({
			loginUser: "auth/loginUser"

		}),
		async login() {
			const formdata = {
				email: this.userName,
				password: this.password
			}
			console.log("FORM data", formdata)
			this.setAuthPayload(formdata)
			await this.loginUser()
			if (this.isAuthenticated) {
				this.$router.push('/Dashboard')
			}
		},


	},


}

</script>
<style lang="scss">
.form {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 500px;
	width: auto;
}

.rootLogin {
	padding: 55px 86px;
	gap: 8px;
	width: 40%;
	// width: 80%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin: auto;
	margin-top: 100px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.mainTitle {

	margin-left: auto;
	margin-right: auto;
	margin-bottom: 30px;
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
.rootLogin{
	padding: 45px 46px;
	gap: 4px;
	width: 80%;
}
}
</style>
	
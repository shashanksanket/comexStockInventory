
<template>
	<div>
		<Navbar />
		<div>


			<div style=" height:100%; margin-top: 40px;">
				<center>
					<h2>Welcome To CMS Dashboard!</h2>
				</center>
			</div>
			<div class="adminCards d-flex flex-wrap justify-content-center">

				<div class="container1">
					<h3>
						<center>
							Total Entries
						</center>
					</h3>
					<div style="margin-top:7%;">
						<b-progress class="mt-2" style="height:30px" :max="max" show-value>
							<b-progress-bar :value="Totaldata" variant="secondary" show-progress
								animated></b-progress-bar>
						</b-progress>
					</div>
				</div>
				<div class="container2">
					<h3>
						<center>
							Total OLTs
						</center>
					</h3>
					<div style="margin-top:7%;">

						<b-progress class="mt-2" style="height:30px" show-value>
							<b-progress-bar :value="TotalOlts" variant="primary" show-progress
								animated></b-progress-bar>
						</b-progress>
					</div>
				</div>
				<div class="container3">
					<h3>
						<center>
							Total Active Connections
						</center>
					</h3>
					<div style="margin-top:7%;">

						<b-progress class="mt-2" style="height:30px" show-value>
							<b-progress-bar :value="TotalConnection" variant="success" show-progress
								animated></b-progress-bar>
						</b-progress>
					</div>
				</div>
				<div class="container4">
					<h3>
						<center>
							Total Inactive Connections
						</center>
					</h3>
					<div style="margin-top:7%;">

						<b-progress class="mt-2" style="height:30px" :max="max" show-value>
							<b-progress-bar :value="Totaldisconnection" variant="danger" show-progress
								animated></b-progress-bar>
						</b-progress>
					</div>
				</div>
				<div class="container5">
					<h3>
						<center>
							Total Vlan left for new Connections
						</center>
					</h3>
					<div style="margin-top:7%;">

						<b-progress class="mt-2" style="height:30px" :max="max" show-value>
							<b-progress-bar :value="TotalConnectionLeft" variant="warning" show-progress
								animated></b-progress-bar>
						</b-progress>
					</div>
				</div>
				<div class="container6">
					<h3>
						<center>
							Total Vlans
						</center>
					</h3>
					<div style="margin-top:7%;">

						<b-progress class="mt-2" style="height:30px" show-value>
							<b-progress-bar :value="TotalVlan" variant="black" show-progress animated></b-progress-bar>
						</b-progress>
					</div>
				</div>
			</div>

			<v-idle @idle="onidle" style="display:none" :duration="900" />
		</div>
		
	</div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
	BSidebar, BProgressBar, BModal, BProgress, BForm, BFormFile, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
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
import VuePapaParse from 'vue-papa-parse'
import Papa from 'papaparse'
import { positive } from '@/@core/utils/validations/validations'
import Vidle from 'v-idle'


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
		Vidle,
		BProgressBar,
		// Form Validation
		ValidationProvider,
		ValidationObserver,
		VuePhoneNumberInput,
		Password,
		BProgress,
	},
	model: {

	},
	props: {


	},
	data() {
		return {
			success: false,
			max: 100,

		}
	},
	computed: {
		...mapState({
			

		}),
	},

	methods: {
		...mapActions({
			logoutUser: "auth/logoutUser",
			

		}),
		onidle() {
			alert('You have been logged out due to inactivity of 15 minutes')
			this.$router.push({ name: "login" });
			this.logoutUser();
		},

		async Download() {
			await this.getData()
			console.log([this.data])
			var csv = Papa.unparse(this.data)
			// Papa.download(unparsedResults, 'LatestData')
			let content = new Blob([csv]);
			let urlObject = window.URL || window.webkitURL || window;
			let url = urlObject.createObjectURL(content);
			let el = document.createElement("a");
			el.setAttribute('href', url)
			el.setAttribute('download', 'CsvExport.csv')
			el.click();
			urlObject.revokeObjectURL(url);
			this.success = true
		}


	},
	async mounted() {
	},



}

</script>
<style lang="scss">
.container1 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container2 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container3 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container4 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container5 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 50px;

	background: #FFFFFF;
	box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
}

.container6 {
	padding: 55px 30px;
	gap: 8px;

	width: 40%;
	height: 60%;
	// height: 1122px;
	// left: 54px;
	// top: 168.02px;
	margin-top: 35px;
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

@media (max-width: 1000px) {
	.adminCards div {
		width: 100%;
	}

}
</style>
	
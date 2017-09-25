<<<<<<< HEAD
export class AuthController
{
	constructor($auth)
	{
		'ngInject';
		this.$auth = $auth;
	}
	register()
	{
		this.$auth.signup(this.user);
=======
export class AuthController {

	constructor($auth) {
		'ngInject';

		this.$auth = $auth;
	}

	register() {
		//vm == view model
		var vm = this;
		this.$auth.signup(this.user).then(function(token){
			vm.$auth.setToken(token);
		});

>>>>>>> 8b7a05e2bb966fbfc83fd089eee60d35c1428578
	}
}
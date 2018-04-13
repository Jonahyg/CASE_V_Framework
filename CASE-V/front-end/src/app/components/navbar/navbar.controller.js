export class NavbarController {
	constructor($auth, $http, API_URL)
	{
		'ngInject';
		this.$auth = $auth;
		this.$http = $http;
		this.isAuthenticated = $auth.isAuthenticated;
		this.isAdmin();
		this.API_URL = API_URL;
		console.log(this.isadmin);
	}
	isAdmin()
	{
		var rr = this;
		this.$http.post('http://10.20.3.24:5000' + '/auth/isAdmin', {test: ["test2"]}).then(function(result)
		{
			console.log(result.data);
			rr.isadmin = result.data;
		})
	}
	logout()
	{
		this.$auth.logout();
	}
}
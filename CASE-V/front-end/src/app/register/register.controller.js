export class RegisterController {
    constructor ($scope, $http, $sce, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.$sce = $sce;
    this.API_URL = API_URL;
    this.levels = null;
    this.get_levels();
	}
	get_levels()
	{
		var rr = this;
		this.$http.get(this.API_URL + '/api/levels').then(function(result)
		{
			rr.levels = result.data;
		});
	}
	register()
	{
		
	}
}
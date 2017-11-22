export class LabsController {
    constructor ($scope, $http) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.$scope.RandomString = "Hello GG";
	}
	click()
	{
		var rr = this;
		this.$http.post('http://localhost:5000/api/test', {test: "test2"}).then(function(result)
		{
			console.log(result);
			rr.$scope.RandomString = result.data;
		})
	}
}
export class LabsController {
    constructor ($scope, $http, $sce, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.$sce = $sce;
    this.API_URL = API_URL;
    this.get_images()
    this.get_instances()
    this.$scope.data = {
	model:null,
	stri: "",
	images: [],
	instances: [],
	iframe: {height: "0", width: "0", src: ""},
	vm_name: ""
    };
	}
	get_images()
	{
		var rr = this;
		var items = 0;
		this.$http.post(this.API_URL + '/api/images', {test: ["test2"]}).then(function(result)
		{
			rr.$scope.data.images = [];
			//console.log(result);
			items = result.data.split(" ")
			for(var i = 0; i < items.length; i++)
			{
				var entry = new Object();
				entry.id = i;
				entry.name = items[i]
				rr.$scope.data.images.push(entry)
			}
		})
	}
	launch_instance()
	{
		var rr = this;
		if(this.$scope.data.model != null)
		{
			this.$http.post(this.API_URL + '/api/instance', {test: [this.$scope.data.model, this.$scope.data.vm_name]}).then(function(result)
			{
				if(result.data == "ACTIVE")
				{
					rr.get_instances()
				}
			})
		}
	}
	get_instances()
	{
		var rr = this;
		var items = 0;
		this.$http.post(this.API_URL + '/api/instances', {test: ["test2"]}).then(function(result)
		{
			console.log(result.data.length);
			if(result.data.length == 0)
			{
				rr.$scope.data.stri = "There are no Instances to display";
			}
			else
			{
				rr.$scope.data.stri = ""
				rr.$scope.data.instances = [];
				//console.log(result);
				items = result.data.split(" ")
				for(var i = 0; i < items.length; i++)
				{
					var entry = new Object();
					entry.id = i;
					entry.name = items[i]
					rr.$scope.data.instances.push(entry)
				}
			}
		})
	}
	get_url(vm_name)
	{
		var rr = this;
		this.$http.post(this.API_URL + '/api/show', {test: [vm_name]}).then(function(result)
		{
			console.log(result.data);
			var url = result.data;
			rr.$scope.data.iframe.url = rr.$sce.trustAsResourceUrl(url);
			rr.$scope.data.iframe.width = "1000";
			rr.$scope.data.iframe.height = "1000";
		})
	}
}
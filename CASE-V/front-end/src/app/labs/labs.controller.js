export class LabsController {
    constructor ($scope, $http) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.get_images()
    this.get_instances()
    this.$scope.data = {
    	model:null,
    	stri: "",
    	images: [],
    	instances: []
    };
	}
	get_images()
	{
		var rr = this;
		var items = 0;
		this.$http.post('http://10.180.6.235:5000/api/images', {test: "test2"}).then(function(result)
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
			this.$http.post('http://10.180.6.235:5000/api/instance', {test: this.$scope.data.model}).then(function(result)
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
		this.$http.post('http://10.180.6.235:5000/api/instances', {test: "test2"}).then(function(result)
		{
			console.log(result.data.length)
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
}
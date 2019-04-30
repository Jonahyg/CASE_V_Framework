export class LabsController {
    constructor ($scope, $http, $sce, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.$sce = $sce;
    this.API_URL = API_URL;
    this.get_images();
    this.get_instances();
    this.get_networks();
    this.get_training();
    //this.get_status();
    this.wait = false;
    this.$scope.data = {
		model:null,
		stri: "",
		images: [],
		instances: [],
		networks: [],
		traininglabs: {},
		iframe: {height: "0", width: "0", src: ""},
		vm_name: "",
		network_name: ""
	    };
	}
   get_training()
   {
    var rr = this;
    this.$http.get(this.API_URL + '/api/traininglabs').then(function(result)
    {
    	var obj = JSON.parse(result);
        rr.$scope.data.traininglabs = obj;
    });
   }
	get_networks()
	{
		this.wait = true;
		var rr = this;
		var items = 0;
		this.$http.post(this.API_URL + '/api/networks', {test: ["test2"]}).then(function(result)
		{
			rr.$scope.data.networks = [];
			//console.log(result);
			items = result.data.split(" ")
			for(var i = 0; i < items.length; i++)
			{
				var entry = new Object();
				entry.id = i;
				entry.name = items[i]
				rr.$scope.data.networks.push(entry)
			}
		rr.wait = false;
		})
	}
	clear_fields()
	{
		this.$scope.data.model = null;
		this.$scope.data.vm_name = null;
		this.$scope.data.network_name = null;
	}
	get_images()
	{
    	this.wait = true;
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
		rr.wait = false;
		})
	}
	launch_instance()
	{
    	this.wait = true;
		var rr = this;
		if(this.$scope.data.model != null)
		{
			this.$http.post(this.API_URL + '/api/instance', {test: [this.$scope.data.model, this.$scope.data.vm_name, this.$scope.data.network_name]}).then(function(result)
			{
				if(result.data == "ACTIVE")
				{
					rr.get_instances()
				}

				rr.wait = false;
				rr.clear_fields();
			})
		}
	}
	launch_training()
	{
    	this.wait = true;
		var rr = this;
		if(this.$scope.data.model != null)
		{
			this.$http.post(this.API_URL + '/api/training', {test: [this.$scope.data.model]}).then(function(result)
			{
				if(result.data == "ACTIVE")
				{
					rr.get_instances()
				}

				rr.wait = false;
				rr.clear_fields();
			})
		}
	}
	reboot_instance(vm_name)
	{
		this.wait = true;
		var rr = this;
		this.$http.post(this.API_URL + '/api/reboot', {test: [vm_name]}).then(function(result)
		{
			rr.wait = false;
			rr.get_instances();
		})
	}
	suspend_instance(vm_name)
	{
		console.log("GG");
		this.wait = true;
		var rr = this;
		this.$http.post(this.API_URL + '/api/suspend', {test: [vm_name]}).then(function(result)
		{
			console.log(result.data);
			rr.wait = false;
			rr.get_instances();
		})
	}
	delete_instance(vm_name)
	{
		this.wait = true;
		var rr = this;
		this.$http.post(this.API_URL + '/api/delete', {test: [vm_name]}).then(function(result)
		{
			rr.wait = false;
			rr.get_instances();
		})
	}
	create_image(vm_name)
	{
		this.wait = true;
		var rr = this;
		this.$http.post(this.API_URL + '/api/suspend', {test: [vm_name]}).then(function(result)
		{
			rr.wait = false;
		})
	}
	get_instances()
	{
    	this.wait = true;
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
					entry.name = items[i];
					entry.status = "";
					rr.$scope.data.instances.push(entry);
				}
			}
		rr.get_status();
		rr.wait = false;
		})
	}
	get_url(vm_name)
	{
    	this.wait = true;
		var rr = this;
		this.$http.post(this.API_URL + '/api/show', {test: [vm_name]}).then(function(result)
		{
			console.log(result.data);
			var url = result.data;
			rr.$scope.data.iframe.url = rr.$sce.trustAsResourceUrl(url);
			rr.$scope.data.iframe.width = "1000";
			rr.$scope.data.iframe.height = "1000";
			rr.wait = false;
		})
	}
	get_status()
	{
		var rr = this;
		this.wait = true;

		this.$scope.data.instances.forEach(function(item)
		{
			rr.$http.post(rr.API_URL + '/api/check', {test: [item.name]}).then(function(result)
			{
				 item.status = result.data;
			})
		})
		rr.wait = false;
	}
}
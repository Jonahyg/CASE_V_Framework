export class MainController {
  constructor ($http, ModalService, $scope, $sce, API_URL, $auth, $state) {
    'ngInject';

    this.$state = $state;
    this.$http = $http;
    this.$scope = $scope;
    this.ModalService = ModalService;
    this.switch = false;
    this.$sce = $sce;
    this.API_URL = API_URL;
    this.levels = null;
    this.quotas = null;
    this.$auth = $auth;
    this.isAuthenticated = $auth.isAuthenticated;
    this.userexists = false;
    this.get_levels();
    this.get_quotas();
    var vm = this;
    this.str="";

  }
  Switch()
  {
    if(this.switch == false)
        this.switch = true;
    else
        this.switch = false;
    console.log(this.switch);
  }
  get_quotas()
  {
    var rr = this;
    this.$http.get(this.API_URL + '/api/quotas').then(function(result)
    {
        rr.quotas = result.data;
    });
  }
    get_levels()
    {
        var rr = this;
        this.$http.get(this.API_URL + '/api/levels').then(function(result)
        {
            rr.levels = result.data;
        });
    }
    register() {
        //vm == view model
        var vm = this;
        this.user.projectname = this.user.username + "_Project"
        this.user.verified = false;
        this.$auth.signup(this.user).then(function(token){
            console.log(token);
           //vm.$auth.setToken(token);
        });
        this.user = null;

    }
    login() {
        //vm == view model
        var vm = this;
        this.$auth.login(this.login.user).then(function(token){
            vm.$auth.setToken(token);
        });
        this.login.user = null;
        console.log(vm.$auth.isAuthenticated()); 
        this.$state.reload();
    }
    test()
    {
        console.log("log");
        this.$http.post(this.API_URL + '/api/test', {test: ["test2"]}).then(function(result)
        {
            console.log(result);
        });
    }
    check_user(username)
    {
        var vm = this;
        this.$http.post(this.API_URL + '/api/username', {test: username}).then(function(result)
        {
            if(result.data == true)
            {
                vm.userexists = true;
            }
            else
                vm.userexists = false;

            console.log(result.data);
        });
    }     
}

 

export class MainController {
  constructor ($http, ModalService, $scope, $sce, API_URL, $auth) {
    'ngInject';

    this.$http = $http;
    this.$scope = $scope;
    this.ModalService = ModalService;
    this.switch = false;
    this.$sce = $sce;
    this.API_URL = API_URL;
    this.levels = null;
    this.$auth = $auth;
    this.get_levels();
    var vm = this;

  }
  Switch()
  {
    if(this.switch == false)
        this.switch = true;
    else
        this.switch = false;
    console.log(this.switch);
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
        this.user.verified = false;
        this.$auth.signup(this.user).then(function(result){
            console.log(result);
           // vm.$auth.setToken(token);
        });

    }
    login() {
        //vm == view model
        var vm = this;
        this.$auth.login(this.login.user).then(function(token){
            vm.$auth.setToken(token);
        });

    }
}

 

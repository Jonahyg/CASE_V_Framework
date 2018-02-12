export class AdminController {
  constructor ($http) {
    'ngInject';

    this.$http = $http;
    this.tabs = ['New User Requests', 'User Privileges'];
    


  }  
  
}

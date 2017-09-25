export class MainController {
  constructor ($http) {
    'ngInject';

    this.$http = $http;
    this.getMessages();
  }
<<<<<<< HEAD

  getMessages()
  {
    var vm = this;
    this.$http.get('http://localhost:5000/api/message').then(function(result)
      {
        vm.messages = result.data;
      });
=======
  getMessages()
  {
  	var vm = this;
  	this.$http.get('http://localhost:5000/api/message').then(function(result){
  		vm.messages = result.data;
  		});
>>>>>>> 8b7a05e2bb966fbfc83fd089eee60d35c1428578
  }
  postMessage()
  {
    this.$http.post('http://localhost:5000/api/message', {msg: this.message});
  }
  
}

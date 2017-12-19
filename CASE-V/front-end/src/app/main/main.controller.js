export class MainController {
  constructor ($timeout, webDevTec, toastr, $rootScope){
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1508181525607;
    this.toastr = toastr;

    this.activate($timeout, webDevTec);
    $rootScope.serverURL = "http://10.180.6.235:5000";
  }

  activate($timeout, webDevTec) {
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}

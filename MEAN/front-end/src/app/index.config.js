export function config ($logProvider, toastrConfig, $authProvider, API_URL) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

<<<<<<< HEAD
  $authProvider.signupUrl = API_URL + 'auth/register';
=======
  	$authProvider.signupUrl = API_URL + 'auth/register';
>>>>>>> 8b7a05e2bb966fbfc83fd089eee60d35c1428578
}

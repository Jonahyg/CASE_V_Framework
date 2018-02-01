/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { AuthController } from './auth/auth.controller';
import { NavbarController } from './components/navbar/navbar.controller';
import { AdminController } from './admin/admin.controller';
import { CompareToDirective } from './directives/compareTo.directive';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('example', ['ui.router', 'ui.bootstrap', 'toastr', 'satellizer', 'angularModalService'])
  .constant('API_URL', 'http://10.180.6.235:5000')
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('RegisterController', RegisterController)
  .controller('AuthController', AuthController) 
  .controller('AdminController', AdminController) 
  .controller('NavbarController', NavbarController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('compareTo', CompareToDirective);


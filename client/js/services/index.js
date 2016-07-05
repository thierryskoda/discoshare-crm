import TranslationService from './translation';
import AuthService from './auth.service';
import UserService from './user.service';
import LeadService from './lead.service';
import RouteService from './route.service';
import ModalService from './modal.service';
import SingletonService from './singleton.service';

module.exports = 'app.services';
var app = angular.module(module.exports, [
	TranslationService,
	AuthService,
	UserService,
    LeadService,
    RouteService,
    ModalService,
    SingletonService
]);

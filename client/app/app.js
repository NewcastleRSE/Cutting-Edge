'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngInfiniteScroll from 'ng-infinite-scroll';

import {
    routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import Modal from '../components/modal/modal.service';
import artefact from './artefact/artefact.component';
import casestudies from './casestudies/casestudies.component';
import search from './search/search.component';
import home from './home/home.component';
import periods from './periods/periods.component';
import map from './map/map.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import timeline from '../directives/timeline/timeline.directive';


import './app.scss';

angular.module('cuttingEdgeDockerApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, ngInfiniteScroll,
    navbar, footer, artefact, home, casestudies, search, periods, constants, util, timeline, map, Modal
])
    .config(routeConfig);

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['cuttingEdgeDockerApp'], {
            strictDi: true
        });
    });

'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
    menu = [{
        title: 'Home',
        state: 'home'
    },
    {
        title: 'Search',
        state: 'search'
    },
    {
        title: 'Case Studies',
        state: 'casestudies'
    },
    {
        title: 'Artefact',
        state: 'artefact'
    },
    {
        title: 'Timeline',
        state: 'periods'
    },
    ];
    isCollapsed = true;

}

export default angular.module('directives.navbar', [])
    .component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarComponent
    })
    .name;

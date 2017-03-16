import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './search.routes';

export class SearchController {

    artefacts = [];
    keyword = '';
    page = 1;
    pageSize = 50;
    categories = [];
    materials = [];
    periods = [];
    hasDescription = false;
    hasReferences = false;

    nextPage = function(){
        this.page++;
        this.search();
    };

    filterDescription = function(include){
        console.log(include);
        this.hasDescription = include;
        this.search();
    };

    filterReferences = function(include){
        this.hasReferences = include;
        this.search();
    };

    search = function(){

        let queryString = '';

        queryString += this.keyword ? 'text=' + this.keyword + '&' : '';
        queryString += this.page ? 'page=' + this.page + '&' : '';
        queryString += this.pageSize ? 'count=' + this.pageSize + '&' : '';
        queryString += this.categories.length ? 'category=' + this.categories + '&' : '';
        queryString += this.materials.length ? 'material=' + this.materials + '&' : '';
        queryString += this.periods.length ? 'period=' + this.periods + '&' : '';
        queryString += this.hasDescription ? 'hasDescription=' + this.hasDescription + '&' : '';
        queryString += this.hasReferences ? 'hasReferences=' + this.hasReferences + '&' : '';

        this.$http.get('/api/artefacts?' + queryString)
            .then(response => {
                this.artefacts = response.data;
            });
    };

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    $onInit() {
        this.search();
    }
}

export default angular.module('cuttingEdgeDockerApp.search', [uiRouter])
    .config(routing)
    .component('search', {
        template: require('./search.view.html'),
        controller: SearchController
    })
    .name;

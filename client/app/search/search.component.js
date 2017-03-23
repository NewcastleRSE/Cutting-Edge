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
    selectedCategories = {};
    selectedMaterials = {};
    selectedPeriods = {};
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

        let selectedCategories = this.selectedCategories;
        let selectedMaterials = this.selectedMaterials;
        let selectedPeriods = this.selectedPeriods;

        let queryString = '';

        queryString += this.keyword ? 'text=' + this.keyword + '&' : '';
        queryString += this.page ? 'page=' + this.page + '&' : '';
        queryString += this.pageSize ? 'count=' + this.pageSize + '&' : '';

        Object.keys(selectedCategories).forEach(function(categoryId){
            if(selectedCategories[categoryId]){
                queryString += 'category=' + categoryId + '&';
            }
        });

        Object.keys(selectedMaterials).forEach(function(materialId){
            if(selectedMaterials[materialId]) {
                queryString += 'material=' + materialId + '&';
            }
        });

        Object.keys(selectedPeriods).forEach(function(periodId){
            if(selectedPeriods[periodId]){
                queryString += 'period=' + periodId + '&';
            }

        });

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

        this.$http.get('/api/categories')
            .then(response => {
                this.categories = response.data;
            });

        this.$http.get('/api/materials')
            .then(response => {
                this.materials = response.data;
            });

        this.$http.get('/api/periods')
            .then(response => {
                this.periods = response.data;
            });
    }
}

export default angular.module('cuttingEdgeDockerApp.search', [uiRouter])
    .config(routing)
    .component('search', {
        template: require('./search.view.html'),
        controller: SearchController
    })
    .name;

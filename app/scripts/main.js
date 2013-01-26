require.config({
    shim:{
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    },

    paths:{
        jquery:'vendor/jquery.min',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        text: 'vendor/text',
        templates: '../templates/',
        bootstrap: 'vendor/bootstrap'
    }
});

require(['jquery', 'views/mainView', 'router', 'bootstrap'], function ($, MainView, Router, Bootstrap) {
    "use strict";

    var mainView = new MainView();
    mainView.render();

    Router.initialize({
        mainView: mainView
    });
});
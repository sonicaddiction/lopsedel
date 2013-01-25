require.config({
    shim:{
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },

    paths:{
        jquery:'vendor/jquery.min',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        text: 'vendor/text',
        templates: '../templates/'
    }
});

require(['jquery', 'views/mainView', 'router'], function ($, MainView, Router) {
    "use strict";

    var mainView = new MainView();
    mainView.render();

    Router.initialize({
        mainView: mainView
    });
});
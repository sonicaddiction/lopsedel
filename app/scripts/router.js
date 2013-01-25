/*global define: false, require: false, window: false */
/*jslint nomen: true, vars: true */

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    "use strict";
    var AppRouter = Backbone.Router.extend({
        routes: {
            'admin/wordClass/:wordClass': 'adminWordClass',
            'admin': 'admin',
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (mainView) {
        var router = new AppRouter({
            mainView: mainView
        });

        router.on('route:defaultAction', function () {
            require(['views/headline/headlineView'], function(HeadlineView) {
                var headlineView = new HeadlineView();
                headlineView.render();
            });
        });

        router.on('route:adminWordClass', function (wordClass) {
            require(['views/admin/wordClassAdminView'], function(WordClassAdminView) {
                var wordClassAdminView = new WordClassAdminView({
                    wordClass: wordClass
                });
                wordClassAdminView.render();
            });
        });

        router.on('route:admin', function () {
            require(['views/admin/adminView'], function(AdminView) {
                var adminView = new AdminView();
                adminView.render();
            });
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
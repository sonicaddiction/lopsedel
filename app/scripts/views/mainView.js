/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone',
    'text!templates/layout.html'], function ($, _, Backbone, layoutTemplate) {
    "use strict";
    var AppView = Backbone.View.extend({
        el: '#appContent',

        initialize: function () {
        },

        render: function () {
            var compiledTemplate = _.template(layoutTemplate);
            $(this.el).html(compiledTemplate);
        }
    });
    return AppView;
});
/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone',
    'text!templates/layout.html'], function ($, _, Backbone, layoutTemplate) {
    "use strict";
    var AppView = Backbone.View.extend({
        el: '#appContent',

        events: {
            'click #mainMenu ul a': 'handleMenu',
            'click #mainMenu .brand': 'setDefaultMenuSelection'
        },

        initialize: function () {
        },

        setDefaultMenuSelection: function () {
            var $element = this.$el.find('#mainMenu ul.nav li').eq(0);

            $element.addClass('active');
            $element.siblings().removeClass('active');
        },

        handleMenu: function (event) {
            var $element = $(event.currentTarget);

            $element.parent().addClass('active');
            $element.parent().siblings().removeClass('active');
        },

        render: function () {
            var compiledTemplate = _.template(layoutTemplate);
            $(this.el).html(compiledTemplate);
        }
    });
    return AppView;
});
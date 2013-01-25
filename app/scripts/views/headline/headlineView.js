/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone',
    'text!templates/headline/headlineTemplate.html'], function ($, _, Backbone, headlineTemplate) {
    "use strict";
    var HeadlineView = Backbone.View.extend({
        el: '#mainContainer',

        events: {
            'click .headlineContainer h1': 'reloadHeadline'
        },

        initialize: function () {
        },

        reloadHeadline: function () {
            var that = this;

            $.get('http://localhost:8080/headline', function (data) {
                that.renderHeadline(data);
            });
        },

        render: function () {
            this.reloadHeadline();
        },

        renderHeadline: function (data) {
            var compiledTemplate = _.template(headlineTemplate, {
                headline: data.headline.toUpperCase()
            });
            $(this.el).html(compiledTemplate);
        }
    });
    return HeadlineView;
});
/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone'], function ($, _, Backbone) {
    "use strict";
    var HeadlineModel = Backbone.Model.extend({
        defaults: {
            sentence: 'test sentence'
        }
    });
    return HeadlineModel;
});
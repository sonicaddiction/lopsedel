/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone',
    'models/wordModel'], function ($, _, Backbone, WordModel) {
    "use strict";
    var WordCollection = Backbone.Collection.extend({
        model: WordModel,

        url: 'http://localhost:8080/db/words',

        initialize: function (options) {
        },

        parse: function (response) {
            return response.results;
        },

        comparator: function (model) {
            return model.get('expression');
        }
    });

    return WordCollection;
});
/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone'], function ($, _, Backbone) {
    "use strict";
    var WordModel = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot: 'http://localhost:8080/db/words'
    });

    return WordModel;
});
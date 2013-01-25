/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone',
    'text!templates/admin/adminTemplate.html',
    'collections/wordCollection',
    'views/admin/wordListItemView'], function ($, _, Backbone, adminTemplate, WordCollection, WordListItemView) {
    "use strict";
    var AdminView = Backbone.View.extend({
        el: '#mainContainer',

        events: {
            'click .expressionType': 'filter',
            'click #addExpression': 'addExpression'
        },

        initialize: function () {
            var that = this;

            _.bindAll(this, 'appendCollectionList', 'render', 'appendWordClass', 'filter', 'addExpression');

            this.collectionLoaded = $.Deferred();

            this.collection = new WordCollection();
            this.collection.fetch({
                success: function (collection, response) {
                    that.collectionLoaded.resolve(collection);
                }
            });

            this.collection.bind('add', function () {
                this.renderExpressionList();
            }, this);
        },

        addExpression: function () {
            var expressionType = this.$el.find('#addExpressionGroup').data('expressionType');
            var input = this.$el.find('#expressionInput');
            var expression = input.val();

            input.val("");

            this.collection.create({
                expression: expression,
                expressionType: expressionType
            });
        },

        renderExpressionList: function (expressionType) {
            var that = this;

            expressionType = expressionType || this.$el.find('#addExpressionGroup').data('expressionType');

            this.collectionLoaded.done(function (wordCollection) {
                var expressions = wordCollection.where({
                    expressionType: expressionType
                });

                that.appendCollectionList(expressions)
            });
        },

        filter: function (event) {
            var element = $(event.currentTarget);
            var type = element.data('type');

            element.addClass('selected');
            element.siblings().removeClass('selected');

            this.$el.find('#addExpressionGroup').data('expressionType', type);

            this.renderExpressionList(type);
        },

        render: function () {
            var that = this;
            $.get('http://localhost:8080/db/types').done(function (expressionTypes) {
                var compiledTemplate = _.template(adminTemplate);
                that.$el.html(compiledTemplate);

                _.each(expressionTypes.results, function (expressionType) {
                    that.$el.find('#expressionTypefilterList').append(
                        '<li class="expressionType" data-type="' + expressionType + '">' + expressionType + '</li>');
                });
            });
        },

        appendCollectionList: function (wordCollection) {
            this.$el.find('#wordClassList').empty();
            this.$el.find('#addExpressionGroup').show();

            _.each(wordCollection, function (wordClassModel) {
                var expressionType = wordClassModel.get('expressionType');
                this.appendWordClass(wordClassModel);
            }, this);


        },

        appendWordClass: function (wordModel) {
            var wordListItemView = new WordListItemView({
                model: wordModel
            });

            this.$el.find('#wordClassList').append(wordListItemView.render().el);
        }
    });
    return AdminView;
});
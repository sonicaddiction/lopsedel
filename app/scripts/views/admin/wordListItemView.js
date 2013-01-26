/*global define: false */
/*jslint nomen: true */

define(['jquery',
    'underscore',
    'backbone',
    'text!templates/admin/wordListItemTemplate.html'], function ($, _, Backbone, adminTemplate) {
    "use strict";
    var WordClassListItemView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'dblclick .expression': 'showEditable',
            'keypress .rewrite': 'updateCallback',
            'click .delete': 'deleteCallback',
            'click .preview': 'previewCallback'
        },

        initialize: function () {
            var that = this;

            this.model.bind('remove', this.unrender, this);
            this.model.bind('change', this.render, this);

            _.bindAll(this, 'render', 'showEditable', 'updateCallback', 'deleteCallback', 'previewCallback');
        },

        previewCallback: function () {
            var expression = this.model.get('expression');

            $.get('http://localhost:8080/db/sentence', {
                expression: expression
            }).done(function (sentence) {

                $('#exampleSentence').html(sentence.headline);
            });


        },

        unrender: function () {
            this.remove();
        },

        deleteCallback: function (event) {
            this.model.destroy({
                wait: true
            });
        },

        updateCallback: function (event) {
            var expression;
            if (event.keyCode === 13) {
                expression = $(event.currentTarget).val()
                this.model.set({
                    expression:  expression
                })
                this.model.save();

                this.$el.find('.edit').hide();
                this.$el.find('.expression').show();
            }
        },

        showEditable: function () {
            this.$el.find('.edit')
                .show()

            this.$el.find('.rewrite')
                .focus();

            this.$el.find('.expression')
                .hide();

            this.$el.siblings().find('.expression')
                .show();

            this.$el.siblings().find('.edit')
                .hide();
        },

        render: function () {
            var escapedModel = {
                expression: this.model.escape('expression'),
                expressionType: this.model.escape('expressionType')
            };
            var compiledTemplate = _.template(adminTemplate, escapedModel);

            this.$el.html(compiledTemplate);
            this.$el.addClass(this.model.get('expressionType'));
            this.$el.addClass('wordItem');
            this.$el.find('.edit').hide();

            return this;
        }

    });
    return WordClassListItemView;
});
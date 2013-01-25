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
            'click .delete': 'deleteCallback'
            //'blur .rewrite': 'unedit'
        },

        initialize: function () {
            var that = this;

            this.model.bind('remove', this.unrender, this);
            this.model.bind('change', this.render, this);

            _.bindAll(this, 'render', 'showEditable', 'updateCallback', 'deleteCallback', 'unedit');
        },

        unedit: function () {
            this.$el.find('.edit').hide();
            this.$el.find('.expression').show();
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
            var name = this.model.get('expression');

            var compiledTemplate = _.template(adminTemplate, this.model.toJSON());

            this.$el.html(compiledTemplate);
            this.$el.addClass(this.model.get('expressionType'));
            this.$el.addClass('wordItem');
            this.$el.find('.edit').hide();

            return this;
        }

    });
    return WordClassListItemView;
});
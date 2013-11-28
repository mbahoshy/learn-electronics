TRADE.AnswerListView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template(""),
        events: {
                "click": "expand"
        },
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var answerview1 = new TRADE.AnswerView({
                    model: model
                });
                this.$el.append(answerview1.render().el);
        },
        expand: function () {

        }
});
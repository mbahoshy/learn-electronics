TRADE.AnswerSubView = Backbone.View.extend({
        tagName: 'li',
        className: '',
        template: _.template("<%= txt %>"),
        events: {
                "mouseover": "lessonMouseover",
                "mouseout": "lessonMouseout",
                "click": "expand"
        },
        lessonMouseover: function () {
                $(this.el).children().children().addClass('card-hover');

        },

        lessonMouseout: function () {
                $(this.el).children().children().removeClass('card-hover');

        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
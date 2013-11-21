TRADE.AnswerSubView = Backbone.View.extend({
        tagName: 'li',
        className: '',
        template: _.template("<%= txt %>"),
        events: {
                "mouseover": "lessonMouseover",
                "mouseout": "lessonMouseout",
                "click": "answerCheck"
        },
        lessonMouseover: function () {
                $(this.el).addClass('card-hover');

        },

        lessonMouseout: function () {
                $(this.el).removeClass('card-hover');

        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        },

        answerCheck: function () {
                if (TRADE.GameData.answer == this.model.attributes.answerid) {
                        console.log('correct');
                }
                //console.dir(this.model.attributes.answerid);

        }
});
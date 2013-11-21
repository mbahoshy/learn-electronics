TRADE.AnswerSubListView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template(""),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout",
                "click": "expand"
        },
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var answersubview1 = new TRADE.AnswerSubView({
                    model: model
                });
                this.$el.append(answersubview1.render().el);
        },
        expand: function () {
                
        }
});
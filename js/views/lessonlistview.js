TRADE.LessonListView = Backbone.View.extend({
        tagName: 'div',
        className: 'fleft',
        events: {
                "click .chapter-list": "chapterClick"

        },
        chapterClick: function () {
                console.log('hello');

        },
        initialize: function () {

        },
     
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var LessonView1 = new TRADE.LessonView({
                    model: model
                });
                this.$el.append(LessonView1.render().el);
        }
});
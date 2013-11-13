TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: '',
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

                var ChapterView1 = new TRADE.ChapterView({
                    model: model
                });
                this.$el.append(ChapterView1.render().el);
        }
});
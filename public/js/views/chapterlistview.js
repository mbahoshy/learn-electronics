TRADE.ChapterListView = Backbone.View.extend({
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

                if (model.toJSON().active === true) {
                    var ChapterView1 = new TRADE.ChapterView({ model: model });
                } else {
                    var ChapterView1 = new TRADE.ChapterViewInactive({ model: model }); 
                }

                this.$el.append(ChapterView1.render().el);
        }
});
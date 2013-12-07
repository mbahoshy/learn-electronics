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
     
        render : function (user) {
                this.user = user;
                this.z = 0;
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {
                console.log('chaptermodel');
                console.dir(model);
                if (this.z== 0) {
                    var ChapterView1 = new TRADE.ChapterView({ model: model });
                    this.z = 1;
                } else {
                    var ChapterView1 = new TRADE.ChapterViewInactive({ model: model });
                    this.z = 0; 
                }

                this.$el.append(ChapterView1.render(this.user).el);
               
                
        }
});
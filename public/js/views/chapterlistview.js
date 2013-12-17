TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: 'classroom-title',
        template: _.template("<h3><%= navname %></h3>"),
        events: {
                "click .chapter-list": "chapterClick"

        },
        chapterClick: function () {
                console.log('hello');

        },
        initialize: function () {

        },
     
        render : function (user, navname) {
                this.user = user;
                this.collection.forEach(this.addOne, this);
                this.$el.prepend( this.template({navname: navname}));
        },

        addOne: function (model) {

                var ChapterView1 = new TRADE.ChapterView({ model: model });
                this.$el.append(ChapterView1.render(this.user).el);               
        }
});
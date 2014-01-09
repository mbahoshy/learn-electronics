TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: 'classroom-title',
        template: _.template("<h2><%= navname %></h2>"),
        events: {
                "click .chapter-list": "chapterClick"

        },
        chapterClick: function () {
                console.log('hello');

        },
        initialize: function () {
                var ChapterNavView1 = new TRADE.ChapterNavView({collection: this.collection});
                this.$el.append(ChapterNavView1.render());

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

TRADE.ChapterNavView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-subnav',
        template: _.template("<a><%= chaptertitle %></a>"),
        initialize:function () {
                console.dir(this.collection);
        },
        render: function () {
                this.collection.forEach(this.buildNav, this);
                // this.$el.append(this.template);
                 return (this.$el);
        },
        buildNav: function (model) {
                console.dir(model);
                this.$el.append(this.template(model.attributes));
        }

})
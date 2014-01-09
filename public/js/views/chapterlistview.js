TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: 'classroom-title',
        template: _.template("<div class='fleft'><h2><%= navname %></h2></div>"),
        template2:_.template("<%= name %> <%= snippet %>"),
        events: {
                "click .chapter-list": "chapterClick"

        },
        chapterClick: function () {
                console.log('hello');

        },
        initialize: function () {
                var ChapterNavView1 = new TRADE.ChapterNavView({collection: this.collection});
                this.$el.append(ChapterNavView1.render(0));

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
        className: 'chapter-header',
        template0: _.template ("<div id='chapter_description'><%= name %> <%= snippet %><div>"),
        template: _.template("<div class='chapter-subnav'><span class='chapterlink'><%= chaptertitle %></span></div>"),
        initialize:function () {
                console.dir(this);
                this.listenTo(this.collection, 'reset', this.render);
        },
        events: {
                "click .chapterlink": "chapterClick"

        },
        chapterClick: function () {
                alert("Hello");
                this.updateChapterInfo(1);
        },
        updateChapterInfo: function (modelnumber) {
                console.log('dicks');
                $('#chapter_description').remove();
                this.$el.prepend(this.template0(this.collection.models[modelnumber].attributes));

        },
        render: function (modelnumber) {
                this.collection.forEach(this.buildNav, this);
                console.dir(this.collection.models);
                this.$el.prepend(this.template0(this.collection.models[modelnumber].attributes));
                return (this.$el);
        },
        buildNav: function (model) {
                console.dir(model);
                var x = ("<div")
                this.$el.append(this.template(model.attributes));
                
        }

})
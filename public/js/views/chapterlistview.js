TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-header',
        template: _.template ("<h2><%= navname %></h2><div id='chapter_description'><%= attributes.name %> <%= attributes.snippet %><div>"),
        events: {
                "click .chapterlink": "chapterClick"

        },
        chapterClick: function () {
                console.log('hello');

        },
        initialize: function () {
                

        },
        render : function (user, navname) {
                var attributes;
                this.user = user;
                attributes = this.collection.models[0].attributes;

                
                this.$el.prepend(this.template({attributes: attributes, navname: navname}));
        
                var ChapterNavView1 = new TRADE.ChapterNavView({collection: this.collection});
                this.$el.append(ChapterNavView1.render(0));
                this.renderLessons(0);
                this.renderProblems(0);
                
                // this.collection.forEach(this.addOne, this);

        },
        renderLessons : function (modelnumber) {
                var lessons = this.collection.models[modelnumber].attributes.lessons;
                var chapterid = this.collection.models[modelnumber].attributes.chapterid;
                // var lessonview1 = TRADE.LessonCardView(lessons[key]);
                var LessonView1 = new TRADE.LessonView({ model: lessons});
                this.$el.append(LessonView1.render(this.user, chapterid).el);
                
        },
        renderProblems :function (modelnumber) {
                var problems = this.collection.models[modelnumber].attributes.problems;
                var chapterid = this.collection.models[modelnumber].attributes.chapterid;
                console.dir(problems);
                var ProblemView1 = new TRADE.ProblemView({ model: problems});
                this.$el.append(ProblemView1.render(this.user, chapterid).el);
        },
        addOne: function (model) {
                var ChapterView1 = new TRADE.ChapterView({ model: model });
                this.$el.append(ChapterView1.render(this.user).el);               
        }
});

TRADE.ChapterNavView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-subnav',
        template: _.template("<span class='chapterlink'><%= chaptertitle %></span>"),
        initialize:function () {
                console.dir(this);
                this.listenTo(this.collection, 'reset', this.render);
        },
        // events: {
        //         "click .chapterlink": "chapterClick"

        // },
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
                
                return (this.$el);
        },
        buildNav: function (model) {
                console.dir(model);
                
                this.$el.append(this.template(model.attributes));
                
                
        }

});

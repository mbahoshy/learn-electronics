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
                
                // this.collection.forEach(this.addOne, this);

        },
        renderLessons : function (modelnumber) {
                var lessons = this.collection.models[modelnumber].attributes.lessons;
                console.dir(lessons);
                // var lessonview1 = TRADE.LessonCardView(lessons[key]);
                var LessonView1 = new TRADE.LessonView({ model: lessons });
                this.$el.append(LessonView1.render(this.user).el);
                
        },
        renderProblems :function () {

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

TRADE.LessonCardView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-container',
        template: _.template("<a class='no-decoration' href='#slides/<%= chapterid %>/<%= lessonid %>'><div class='lesson-list'><h5><%= name %></h5><h6><%= snippet %></h6></div></a>"),
        render : function () {
                // var completed = _.findWhere(user.lessonProgress, {lessonid: this.model.lessonid});
                // this.$el.html( this.template(this.model));
                // if (completed) {
                //         $(this.el).children().children().prepend('<img class="check" src="imgs/lessoncheck.png"/>');
                // }
                // this.$el.html( this.template(this.model));
                // return (this.$el);
                console.dir(model);
                
        }        
});
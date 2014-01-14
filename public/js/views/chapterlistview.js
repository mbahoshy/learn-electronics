TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-header',
        template: _.template ("<h4><%= navname %></h4><h2><%= attributes.name %></h2><div class='clear'></div><h3><%= attributes.snippet %></h3>"),
        events: {
                "click .chapterlink": "chapterClick"

        },
        chapterClick: function (e) {
                var nav = $(e.currentTarget).data('nav');
                console.log(nav);
                this.$el.html('');
                this.render(nav);

        },
        resetChapters: function () {
                

        },
        render : function (chapterindex) {
                var attributes;
                this.user = this.collection.user;
                var navname = this.collection.navname;
                attributes = this.collection.models[chapterindex].attributes;

                
                this.$el.prepend(this.template({attributes: attributes, navname: navname}));
        
                var ChapterNavView1 = new TRADE.ChapterNavView({collection: this.collection});
                this.$el.append(ChapterNavView1.render(chapterindex));
                this.renderLessons(chapterindex);
                this.renderProblems(chapterindex);
                this.renderTests(chapterindex);
                
                // this.collection.forEach(this.addOne, this);

        },
        renderLessons : function (chapterindex) { //renders lesson column
                var lessons = this.collection.models[chapterindex].attributes.lessons;
                var chapterid = this.collection.models[chapterindex].attributes.chapterid;
                var LessonView1 = new TRADE.LessonView({ model: lessons});
                this.$el.append(LessonView1.render(this.user, chapterid).el);
                
        },
        renderProblems :function (chapterindex) { //renders problem column
                var problems = this.collection.models[chapterindex].attributes.problems;
                var chapterid = this.collection.models[chapterindex].attributes.chapterid;
                var ProblemView1 = new TRADE.ProblemView({ model: problems});
                this.$el.append(ProblemView1.render(this.user, chapterid).el);
        },
        renderTests : function (chapterindex) {
                var tests = this.collection.models[chapterindex].attributes.tests;
                var chapterid = this.collection.models[chapterindex].attributes.chapterid;
                var testView1 = new TRADE.TestView({ model: tests});
                this.$el.append(testView1.render(this.user, chapterid).el);
        },
        addOne: function (model) {
                var ChapterView1 = new TRADE.ChapterView({ model: model });
                this.$el.append(ChapterView1.render(this.user).el);               
        }
});

TRADE.ChapterNavView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-subnav',
        template: _.template("<span data-nav='<% var counterminus = counter - 1; %><%= counterminus %>' class='chapterlink'>Chapter <%= counter %></span>"),
        render: function (modelnumber) {
                // this.collection.forEach(this.buildNav, this);
                // console.dir(this.collection.models);
                var numchapters = this.collection.models.length;

                for (var i = numchapters; i > 0; i--) {
                        this.$el.append(this.template({counter: i}));
                }
                
                console.log(numchapters);
                
                return (this.$el);
        }

});


TRADE.TestView = Backbone.View.extend({
        tagName: 'div',
        className: 'test-container',
        template: _.template("<a class='no-decoration' href=''><div class='test-list'><h5><%= model.testname %></h5><h6><%= model.testsnippet %></h6></div></a>"),
        events: {
                "mouseover a": "lessonMouseover",
                "mouseout a": "lessonMouseout"
        },
        lessonMouseover: function (e) {
                $(e.currentTarget).children().addClass('card-hover');

        },

        lessonMouseout: function (e) {
                $(e.currentTarget).children().removeClass('card-hover');

        },
        render : function (user, chapterid) {
                console.dir(this);
                this.chapterid = chapterid;
                this.user = user;
                this.model.forEach(this.renderCard, this);
                // var completed = _.findWhere(user.lessonProgress, {lessonid: this.model.lessonid});
                // this.$el.html( this.template(this.model));
                // if (completed) {
                //         $(this.el).children().children().prepend('<img class="check" src="imgs/lessoncheck.png"/>');
                // }
                return this;
                
        },
        renderCard : function (model) {
                console.dir(model);
                this.$el.append( this.template({model: model, chapterid: this.chapterid}));
        }
});

TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-container',
        template: _.template("<a class='no-decoration' href='#slides/<%= chapterid %>/<%= model.lessonid %>'><div class='lesson-list'><h5><%= model.name %></h5><h6><%= model.snippet %></h6></div></a>"),
        events: {
                "mouseover a": "lessonMouseover",
                "mouseout a": "lessonMouseout"
        },
        lessonMouseover: function (e) {
                $(e.currentTarget).children().addClass('card-hover');

        },

        lessonMouseout: function (e) {
                $(e.currentTarget).children().removeClass('card-hover');

        },
        render : function (user, chapterid) {
                console.dir(this);
                this.chapterid = chapterid;
                this.user = user;
                this.model.forEach(this.renderCard, this);
                // var completed = _.findWhere(user.lessonProgress, {lessonid: this.model.lessonid});
                // this.$el.html( this.template(this.model));
                // if (completed) {
                //         $(this.el).children().children().prepend('<img class="check" src="imgs/lessoncheck.png"/>');
                // }
                return this;
                
        },
        renderCard : function (model) {
                console.dir(model);
                this.$el.append( this.template({model: model, chapterid: this.chapterid}));
        }
});


TRADE.ProblemView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-container',
        template: _.template("<a href ='#/problemslides/<%= chapterid %>/<%= model.problemlevel %>/<%= model.problemname %>/<%= model.problemid %>'><div class='problem-list'><h5><%= model.problemname %></h5><br>Problems Completed: <%= model.problemscompleted %>/<%= model.numproblems %></div></a>"),
        template2: _.template("<a href ='#/problemslides/<%= chapterid %>/<%= model.problemlevel %>/<%= model.problemname %>/<%= model.problemid %>'><div class='problem-list'><h5><%= model.problemname %></h5><br></div></a>"),
        events: {
                "mouseover a": "lessonMouseover",
                "mouseout a": "lessonMouseout"
        },
        lessonMouseover: function (e) {
                $(e.currentTarget).children().addClass('card-hover');

        },

        lessonMouseout: function (e) {
                $(e.currentTarget).children().removeClass('card-hover');

        },
        render : function (user, chapterid) {
                // this.model.attributes.level = $('#subnav_container').data('problemactivenav');
                console.dir(this);
                this.chapterid = chapterid;
                this.user = user;
                console.dir(user);
                this.model.forEach(this.renderCard, this);
                
                // var colorClass;
                // switch (this.model.attributes.problemlevel) {
                //         case "Rookie":
                //                 colorClass = "green";
                //                 break;
                //         case "Apprentice":
                //                 colorClass = "yellow";
                //                 break;
                //         case "Journeyman":
                //                 colorClass = "red";
                //                 break;
                // }
                // $(this.el).addClass(colorClass);
                return this;
                
        },
        renderCard: function (model) {
                console.dir(model);
                console.dir(this);
                var completed = _.findWhere(TRADE.UserData.problemProgress, {problemid: model.problemid});
                if (completed) {
                        var problemscompleted = completed.unlocked.length;
                        var numproblems = completed.numberOfQuestions;
                        
                        model.problemscompleted = problemscompleted;
                        model.numproblems = numproblems;
                        this.$el.append( this.template({model: model, chapterid: this.chapterid}));
                } else {
                        this.$el.append( this.template2({model: model, chapterid: this.chapterid}));
                }
        }
});
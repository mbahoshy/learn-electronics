TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-header',
        template: _.template ("<h4><%= navname %></h4><h2><%= attributes.name %></h2><div class='clear'></div><h3><%= attributes.snippet %></h3>"),
        events: {

        },
        resetChapters: function () {
                

        },
        render : function (nav, user) {
                console.dir(nav);
                console.dir(user);

                // var attributes;
                this.user = user;
                // var navname = this.collection.navname;
                // attributes = this.collection.models[chapterindex].attributes;

                
                // this.$el.prepend(this.template({attributes: attributes, navname: navname}));

                this.renderLessons(nav, user);
                this.renderProblems(nav, user);
                this.renderTests(nav, user);
                




                // this.collection.forEach(this.addOne, this);

        },
        renderLessons : function (nav, user) { //renders lesson column
                var classid = nav._id;
                var lessons = nav.lessons;
                var LessonView1 = new TRADE.LessonView({ model: lessons});
                this.$el.append(LessonView1.render(user, classid).el);
                
        },
        renderProblems :function (nav, user) { //renders problem column
                var classid = nav._id;
                var problems = nav.problems;

                var ProblemView1 = new TRADE.ProblemView({ model: problems});
                this.$el.append(ProblemView1.render(user, classid).el);
        },
        renderTests : function (nav, user) { //renders test column
                var classid = nav._id;
                var tests = nav.tests;

                var testView1 = new TRADE.TestView({ model: tests});
                this.$el.append(testView1.render(user, classid).el);
        },
        addOne: function (model) {
                
                var ChapterView1 = new TRADE.ChapterView({ model: model });
                this.$el.append(ChapterView1.render(this.user).el);               
        }
});


TRADE.TestView = Backbone.View.extend({
        tagName: 'div',
        className: 'test-container activity-container',
        template: _.template("<a class='no-decoration' href='#test/<%= classid %>/<%= model.testid %>'><div class='test-list activity-list'><span class='activity-label'>TEST</span><div class='check-box'></div><h5><%= model.testname %></h5><p><%= model.testsnippet %></p></div></a>"),
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
        render : function (user, classid) {

                this.classid = classid;
                this.user = user;
                this.model.forEach(this.renderCard, this);

                return this;
                
        },
        renderCard : function (model) {
                this.$el.append( this.template({model: model, classid: this.classid}));
                var completed = _.findWhere(this.user.testProgress, {testid: model.testid});

                if (completed && completed.completed === true) {
                        $(this.el).find('.check-box').last().addClass('check-green');
                }
        }
});

TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-container activity-container',
        template: _.template("<a class='no-decoration' href='#slides/<%= classid %>/<%= model.lessonid %>'><div class='lesson-list activity-list'><span class='activity-label'>LESSON</span><div class='check-box'></div><h5><%= model.name %></h5><p><%= model.snippet %></p></div></a>"),
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
        render : function (user, classid) {
                this.classid = classid;
                this.user = user;
                this.model.forEach(this.renderCard, this);
                return this;
                
        },
        renderCard : function (model) {
                this.$el.append( this.template({model: model, classid: this.classid}));
                var completed = _.findWhere(this.user.lessonProgress, {lessonid: model.lessonid});
                console.dir(model);
                console.dir(completed);
                if (completed) {
                        $(this.el).find('.check-box').last().addClass('check-green');
                }
        }
});


TRADE.ProblemView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-container activity-container',
        template: _.template("<a href ='#/problemslides/<%= classid %>/<%= model.problemid %>/<%= model.answerid %>/<%= model.problemlevel %>/<%= model.problemname %>'><div class='problem-list activity-list'><span class='activity-label'>PROBLEM</span><div class='check-box'></div><h5><%= model.problemname %></h5><br>Problems Completed: <%= model.problemscompleted %>/<%= model.numproblems %></div></a>"),
        template2: _.template("<a href ='#/problemslides/<%= classid %>/<%= model.problemid %>/<%= model.answerid %>/<%= model.problemlevel %>/<%= model.problemname %>'><div class='problem-list activity-list'><span class='activity-label'>PROBLEM</span><div class='check-box'></div><h5><%= model.problemname %></h5><br></div></a>"),
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
        render : function (user, classid) {
                // this.model.attributes.level = $('#subnav_container').data('problemactivenav');

                this.classid = classid;
                this.user = user;
                this.model.forEach(this.renderCard, this);
                return this;
                
        },
        renderCard: function (model) {

                var completed = _.findWhere(this.user.problemProgress, {problemid: model.problemid});

                if (completed) {
                        var problemscompleted = _.where(completed.score, {unlocked: true}).length;
                        var numproblems = completed.numberOfQuestions;
                        
                        model.problemscompleted = problemscompleted;
                        model.numproblems = numproblems;
                        this.$el.append( this.template({model: model, classid: this.classid}));
                        if (completed.completed === true) {
                                $(this.el).find('.check-box').last().addClass('check-green');
                        }
                } else {
                        this.$el.append( this.template2({model: model, classid: this.classid}));
                }
        }
});
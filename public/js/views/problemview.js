TRADE.ProblemView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-container',
        template: _.template("<a href ='#/problemslides/<%= chapterid %>/<%= model.problemlevel %>/<%= model.problemname %>/<%= model.problemid %>'><div class='problem-list'><h5><%= model.problemname %></h5><br>Problems Completed: <%= model.problemscompleted %>/<%= model.numproblems %></div></a>"),
        template2: _.template("<a href ='#/problemslides/<%= chapterid %>/<%= model.problemlevel %>/<%= model.problemname %>/<%= model.problemid %>'><div class='problem-list'><h5><%= model.problemname %></h5><br></div></a>"),
        events: {
                "mouseover": "lessonMouseover",
                "mouseout": "lessonMouseout"
        },
        lessonMouseover: function () {
                $(this.el).children().children().addClass('card-hover');

        },

        lessonMouseout: function () {
                $(this.el).children().children().removeClass('card-hover');

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
TRADE.ProblemView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-container',
        template: _.template("<a href ='#/problemslides/<%= problemlevel %>/<%= problemname %>/<%= problemid %>'><div class='problem-list'><h5><%= problemname %></h5><br>Problems Completed: <%= problemscompleted %>/<%= numproblems %></div></a>"),
        template2: _.template("<a href ='#/problemslides/<%= problemlevel %>/<%= problemname %>/<%= problemid %>'><div class='problem-list'><h5><%= problemname %></h5><br></div></a>"),
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
        render : function () {
                // this.model.attributes.level = $('#subnav_container').data('problemactivenav');
                var completed = _.findWhere(TRADE.UserData.problemProgress, {problemid: this.model.attributes.problemid});
                if (completed) {
                        var problemscompleted = completed.unlocked.length;
                        var numproblems = completed.numberOfQuestions;
                        
                        this.model.attributes.problemscompleted = problemscompleted;
                        this.model.attributes.numproblems = numproblems;
                        this.$el.html( this.template(this.model.attributes));
                } else {
                        this.$el.html( this.template2(this.model.attributes));
                }
                var colorClass;
                switch (this.model.attributes.problemlevel) {
                        case "Rookie":
                                colorClass = "green";
                                break;
                        case "Apprentice":
                                colorClass = "yellow";
                                break;
                        case "Journeyman":
                                colorClass = "red";
                                break;
                }
                $(this.el).addClass(colorClass);
                return this;
                
        }
});
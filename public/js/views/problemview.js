TRADE.ProblemView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-container',
        template: _.template("<a href ='#/problemslides/<%= problemid %>'><%= problemname %></a>"),
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
                // var completed = _.findWhere(user.progress, {problemid: this.model.problemid, completed:true});
                this.$el.html( this.template(this.model.attributes));
                // console.log(completed);
                // if (completed) {
                //         this.$el.append('<div>completed</div>');
                // }
                return this;
                
        }
});
TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-container',
        template: _.template("<a class='no-decoration' href='#slides/<%= chapterid %>/<%= lessonid %>/<%= lessontype %>'><div class='lesson-list'><h1><%= name %></h1><h2></h2></div></a>"),
        problemtemplate: _.template("<a class='no-decoration' href='#slides/<%= chapterid %>/<%= lessonid %>/<%= lessontype %>'><div class='lesson-list'><h1><%= name %></h1><h2></h2></div></a>"),
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
        render : function (user) {
                var completed = _.findWhere(user.progress, {lessonid: this.model.lessonid, completed:true});
                this.$el.html( this.template(this.model));
                console.log(completed);
                if (completed) {
                        $(this.el).children().children().prepend('<img class="check" src="imgs/check.png"/>');
                }
                return this;
                
        }
});
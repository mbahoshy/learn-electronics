TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-container',
        template: _.template("<a class='no-decoration' href='#slides/<%= chapterid %>/<%= lessonid %>'><div class='lesson-list'><h5><%= name %></h5><h6><%= snippet %></h6></div></a>"),
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
                console.dir(this.model);
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
                this.$el.append( this.template(model));
        }
});
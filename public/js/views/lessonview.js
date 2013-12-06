TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-container',
        template: _.template("<a class='no-decoration' href='#slides/<%= lessonid %>'><div class='lesson-list'><h1><%= name %></h1><h2></h2></div></a>"),
        problemtemplate: _.template("<a class='no-decoration' href='#slides/<%= lessonid %>'><div class='lesson-list'><h1><%= name %></h1><h2></h2></div></a>"),
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
                console.dir(this);
                if (this.model.lessontype === 'problem') {
                        this.$el.html( this.problemtemplate(this.model) );
                        return this;
                } else {
                        this.$el.html( this.template(this.model));
                        return this;
                }
        }
});
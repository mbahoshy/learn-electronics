TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template("<a class='no-decoration' href='#slides/<%= lessonid %>'><div class='lesson-list'><h1><%= name %></h1><h2><%= snippet %></h2></div></a>"),
        problemtemplate: _.template("<a class='no-decoration' href='#slides/<%= lessonid %>'><div class='lesson-list problem-list'><h1><%= name %></h1><h2><%= snippet %></h2></div></a>"),
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
                if (this.model.toJSON().lessontype === 'problem') {
                        this.$el.html( this.problemtemplate(this.model.toJSON()) );
                        return this;
                } else {
                        this.$el.html( this.template(this.model.toJSON()) );
                        return this;
                }
        }
});
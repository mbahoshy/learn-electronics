TRADE.LessonView = Backbone.View.extend({
        tagName: 'div',
        className: 'lesson-list',
        template: _.template("<a href='/classroom/#HVAC/<%= id %>'><h1><%= name %></h1><h2><%= snippet %></h2></a>"),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout"
        },
        chapterMouseover: function () {
                $(this.el).addClass('chapter-hover');
                //$(this).css('background-color': 'red');

        },

        chapterMouseout: function () {
                $(this.el).removeClass('chapter-hover');
                //$(this).css('background-color': 'red');

        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
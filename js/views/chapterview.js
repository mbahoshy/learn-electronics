TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-list',
        template: _.template("<h1><%= name %></h1><h2><%= snippet %></h2>"),
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
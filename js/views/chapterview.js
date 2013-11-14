TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template("<a href='#lessons/<%= id %>'><div class='chapter-list' ><h1><%= name %></h1><h2><%= snippet %></h2></div></a>"),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout"
        },
        chapterMouseover: function () {
                $(this.el).children().children().addClass('chapter-hover');
        },

        chapterMouseout: function () {
                $(this.el).children().children().removeClass('chapter-hover');
        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
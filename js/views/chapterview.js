TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template("<a href='#lessons/<%= chapterid %>'><div class='chapter-list' ><h1><%= name %></h1><h2><%= snippet %></h2></div></a>"),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout"
        },
        chapterMouseover: function () {
                $(this.el).children().children().addClass('card-hover');
        },

        chapterMouseout: function () {
                $(this.el).children().children().removeClass('card-hover');
        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template("<div class='chapter-list' ><h1><%= name %></h1><h2><%= snippet %></h2></div>"),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout",
                "click": "tester"
        },
        chapterMouseover: function () {
                $(this.el).children().addClass('card-hover');
        },

        chapterMouseout: function () {
                $(this.el).children().removeClass('card-hover');
        },
        tester: function () {
                console.dir(this.model.toJSON().lessons);
                TRADE.router.navigate('#chapter/' + this.model.toJSON().chapterid, {trigger:true});
        },
        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});

TRADE.ChapterViewInactive = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template("<div class='chapter-list inactive' ><h1><%= name %></h1><h2><%= snippet %></h2></div>"),

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
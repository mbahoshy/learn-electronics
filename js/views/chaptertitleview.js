TRADE.ChapterTitleView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-title fleft',
        template: _.template("<h1><%= name %> Chapter - <i><%= snippet %></i></h1>"),   
        render : function () {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

});
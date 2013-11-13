TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-list',
        template: _.template("<h1><%= name %></h1><h2><%= snippet %></h2>"),
        events: {
                "click .chapter-list": "function() {console.log('hello');}"

        },
        initialize: function () {

        },
     
        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
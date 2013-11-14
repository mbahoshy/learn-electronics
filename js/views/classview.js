TRADE.ClassTitleView = Backbone.View.extend({
        tagName: 'div',
        className: 'class-title fleft',
        template: _.template("<h1><%= name %> - <%= snippet %></h1>"),   
        render : function () {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

});
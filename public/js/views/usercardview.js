TRADE.UserView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-card',
        template: _.template("<h2>Hello, <%= firstName %></h2><p><b>Rank:</b> <%= level %></p><p><b>Progress:</b> <%= progress %>%</p>"),
        events: {},

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
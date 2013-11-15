TRADE.UserChapterView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-chapter-card',
        template: _.template("<p><b>Progress:</b> <%= progress %></p><p><b>Lessons Completed:</b> <%= lessonscompleted %></p><p><b>Problems Completed:</b> <%= problemscompleted %></p>"),
        events: {},

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
TRADE.UserView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-card fright',
        template: _.template("<h2>Hello, <%= firstName %></h2><p><b>Rank:</b> <%= level %></p><p><b>Lessons Completed:</b> <%= _.where(progress, {classid: classid, completed:true, lessontype:'lesson'}).length %></p><p><b>Problems Completed:</b> <%= _.where(progress, {classid: classid, completed:true, lessontype:'problem'}).length %></p>"),
        events: {},

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
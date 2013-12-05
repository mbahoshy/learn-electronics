TRADE.UserChapterView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-chapter-card',
        template: _.template("<p><b>Progress:</b> <%= progress %></p><p><b>Lessons Completed:</b> <%= _.where(progress, {classid: TRADE.NavData.classid, chapterid: chapterid, completed:true, lessontype:'lesson'}).length %></p><p><b>Problems Completed:</b> <%= _.where(progress, {classid: TRADE.NavData.classid, chapterid: chapterid, completed:true, lessontype:'problem'}).length %></p>"),
        events: {},

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
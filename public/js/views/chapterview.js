TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-container',
        template: _.template("<div class='chapter-list' ><h3><%= name %></h3><p> - <%= snippet %></p></div>"),
        render : function (user) {
                this.user = user;
                this.$el.html( this.template(this.model.toJSON()) );
                // console.dir(this.model.attributes.lessons);
                this.model.attributes.lessons.forEach(this.addOne, this);
                return this;
        },
        addOne: function (model) {
                model.chapterid = this.model.attributes.chapterid;
                var LessonView1 = new TRADE.LessonView({ model: model });
                this.$el.append(LessonView1.render(this.user).el);
        }
});

TRADE.ChapterViewInactive = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-container odd',
        template: _.template("<div class='chapter-list' ><h3><%= name %></h3><p> - <%= snippet %></p></div>"),

        render : function (user) {
                this.user = user;
                this.$el.html( this.template(this.model.toJSON()) );
                this.model.attributes.lessons.forEach(this.addOne, this);
                return this;
        },
        addOne: function (model) {
                model.chapterid = this.model.attributes.chapterid;
                var LessonView1 = new TRADE.LessonView({ model: model });
                this.$el.append(LessonView1.render(this.user).el);
        }
});
TRADE.ChapterView = Backbone.View.extend({
        tagName: 'div',
        className: 'chapter-container',
        template: _.template("<div class='chapter-title' ><h4><%= snippet %></h4><h3><%= chaptertitle %></h3></div>"),
        render : function (user) {
                this.user = user;
                
                console.dir(this.model);
                console.dir(this.$el);
                this.$el.addClass(this.model.attributes.color);

                this.$el.html( this.template(this.model.toJSON()) );
                var x = _.where(user.lessonProgress, {chapterid: this.model.attributes.chapterid});
                if (x.length === this.model.attributes.lessons.length) {
                    this.$el.children().append("<img class='star' src='imgs/complete.png'/>");
                }
                this.model.attributes.lessons.forEach(this.addOne, this);
                return this;
        },
        addOne: function (model) {
                model.chapterid = this.model.attributes.chapterid;
                var LessonView1 = new TRADE.LessonView({ model: model });
                this.$el.append(LessonView1.render(this.user).el);
        }
});

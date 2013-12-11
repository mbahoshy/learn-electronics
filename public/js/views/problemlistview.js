TRADE.ProblemListView = Backbone.View.extend({
        tagName: 'div',
        className: 'fright',

        render : function (user) {
                this.user = user;
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {
                console.log('problem');
                console.dir(model);

                var LessonView1 = new TRADE.ProblemView({ model: model });


                this.$el.append(LessonView1.render(this.user).el);
               
                
        }
});
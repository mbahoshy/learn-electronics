TRADE.ProblemListView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-list-container',

        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var ProblemView1 = new TRADE.ProblemView({ model: model });


                this.$el.append(ProblemView1.render().el);
               
                
        }
});
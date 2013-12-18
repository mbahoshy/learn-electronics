TRADE.ProblemListView = Backbone.View.extend({
        tagName: 'div',
        className: 'problem-list-container',
        initialize: function () {
        	this.listenTo(this.collection, 'reset', this.render);
        },
        render : function () {
                $(this.el).html('');
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var ProblemView1 = new TRADE.ProblemView({ model: model });


                this.$el.append(ProblemView1.render().el);
               
                
        }
});
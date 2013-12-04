TRADE.ClassCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'fleft',
        events: {
                "click .chapter-list": "chapterClick"

        },
        chapterClick: function () {
                console.log('hello');

        },
        initialize: function () {

        },
     
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                if (model.toJSON().active === true) {
                    var ClassView1 = new TRADE.ClassView({ model: model });
                } else {
                    var ClassView1 = new TRADE.ClassViewInactive({ model: model }); 
                }

                this.$el.append(ClassView1.render().el);
        }
});
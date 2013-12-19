TRADE.ClassCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'fleft',
 
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

TRADE.ClassCollectionReport = Backbone.View.extend({
        tagName: 'div',
        className: 'report-class-container',
        template: _.template('<%= name %> <%= snippet %><br> Lessons Completed: <%= lessonscompleted %>'),
        events: {

        },
        initialize : function () {

        },
        render : function (user) {
                console.dir(user);
                this.user = user;
                console.dir(this.collection);
                this.collection.models.forEach(this.addOne, this);
                

        },

        addOne: function (model) {
                console.dir(model.attributes);
                console.dir(this.user.problemProgress);
                model.attributes.lessonscompleted = _.where(this.user.lessonProgress, {classid: model.attributes._id}).length;
                this.$el.append( this.template(model.attributes));

                

                // var ClassView1 = new TRADE.ClassView({ model: model });
                // this.$el.append(ClassView1.render().el);
        }


});
TRADE.ChapterListView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        //template: _.template("<h1><%= name %></h1><h2><%= snippet %></h2>"),
        events: {},
        initialize: function () {

        },
     
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                var ChapterView1 = new TRADE.ChapterView({
                    model: model
                });
                this.$el.append(ChapterView1.render().el);
        }
});
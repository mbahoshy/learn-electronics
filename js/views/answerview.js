TRADE.AnswerView = Backbone.View.extend({
        tagName: 'ul',
        className: '',
        template: _.template("<%= title %>"),
        events: {
                "mouseover": "lessonMouseover",
                "mouseout": "lessonMouseout",
                "click": "expand"
        },
        lessonMouseover: function () {
                $(this.el).children().children().addClass('card-hover');

        },

        lessonMouseout: function () {
                $(this.el).children().children().removeClass('card-hover');

        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        },
        
        expand: function () {
                console.dir(this);
                
                var answercollection2 = new TRADE.AnswerCollection ();
                answercollection2.reset(this.model.attributes.options);

                var answerlistview2 = new TRADE.AnswerSubListView ({collection: answercollection2});
                answerlistview2.render();
                
                $(this.$el[0]).append(answerlistview2.$el);
                



        }
        
});
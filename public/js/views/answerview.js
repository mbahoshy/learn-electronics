TRADE.AnswerView = Backbone.View.extend({
        tagName: 'ul',
        className: '',
        template: _.template("<%= title %>"),
        events: {
                "click": "expand"
        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        },
        
        expand: function () {

                $('.active-category').removeClass('active-category');
                $('#answer_options').html('');

                var answercollection2 = new TRADE.AnswerCollection ();
                answercollection2.reset(this.model.attributes.options);

                var answerlistview2 = new TRADE.AnswerSubListView ({collection: answercollection2});
                answerlistview2.render();
                
                $('#answer_options').append(answerlistview2.$el);
                //$(this.$el[0]).append(answerlistview2.$el);
                //$(this.$el[0]).find('.answer-sub-list').slideToggle();
                $('#answer_options').find('.answer-sub-list').slideToggle();
                this.$el.addClass('active-category');

        }
        
});
TRADE.AnswerSubView = Backbone.View.extend({
        tagName: 'li',
        className: '',
        template: _.template("<%= txt %>"),
        events: {
                "click": "answerCheck"
        },

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        },

        answerCheck: function () {
                if (TRADE.GameData.answer == this.model.attributes.answerid) {
                        $('.problem-nav-active').removeClass('problem-nav-active');
                        TRADE.GameData.slideindex ++;
                        $("#slide_nav_" + TRADE.GameData.slideindex).addClass('problem-nav-active');
                        $("#level_container").html('');
                        $("#slide_nav_" + TRADE.GameData.slideindex).addClass('unlocked');
                        console.log('correct');
                        console.log(TRADE.GameData.slideindex);
                        $('#answer_question').trigger('click');
                        $('#shadow').fadeToggle();
                        $('#correct').fadeToggle();

                        var slides = $('#slide_holder > .slide');

                        var template = $(slides[TRADE.GameData.slideindex]).html();
                        
                        $("#slide_container").html(_.template(template));
                } else {
                        $('#shadow').fadeToggle();
                        $('#incorrect').fadeToggle();
                }
                //console.dir(this.model.attributes.answerid);

        }
});
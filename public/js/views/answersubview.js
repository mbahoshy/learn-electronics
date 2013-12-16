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
                        var slides = $('#slide_holder > .slide'); // get slide array
                        var slidesNumber = slides.length;
                        console.dir(this.model);
                        
                        

                        if (slidesNumber === TRADE.GameData.slideindex) {

                        }

                        else {
                                TRADE.GameData.slideindex ++;
                                $('.problem-nav-active').removeClass('problem-nav-active');
                                $("#slide_nav_" + TRADE.GameData.slideindex).addClass('problem-nav-active');
                                $("#level_container").html('');
                                $("#slide_nav_" + TRADE.GameData.slideindex).addClass('unlocked');
                                console.log('correct');
                                console.log(TRADE.GameData.slideindex);
                                $('#answer_question').trigger('click');
                                $('#shadow').fadeToggle();
                                $('#correct').fadeToggle();

                                var template = $(slides[TRADE.GameData.slideindex]).html();
                                
                                $("#slide_container").html(_.template(template));
                        }
                } else {
                        $('#shadow').fadeToggle();
                        $('#incorrect').fadeToggle();
                }
                //console.dir(this.model.attributes.answerid);

        }
});
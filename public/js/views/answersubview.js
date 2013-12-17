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
                var unlock;
                var level = $('#answer_container').data('level');
                var problemname = $('#answer_container').data('problemname');
                var problemid = $('#answer_container').data('problemid');
                var problemnumber = TRADE.GameData.slideindex;

                if (TRADE.GameData.answer == this.model.attributes.answerid) {
                        unlock = true;
                        var slides = $('#slide_holder > .slide'); // get slide array
                        var slidesNumber = slides.length;
                        
                        console.log("Correct Answer!");
                        TRADE.GameData.slideindex ++;
                        
                        if (slidesNumber === TRADE.GameData.slideindex) {
                                console.log("last problem");
                                
                        } else {
                                
                                $('.problem-nav-active').removeClass('problem-nav-active');
                                $("#slide_nav_" + TRADE.GameData.slideindex).addClass('problem-nav-active');
                                $("#level_container").html('');
                                $("#slide_nav_" + TRADE.GameData.slideindex).addClass('unlocked');
                                $('#answer_question').trigger('click');
                                $('#shadow').fadeToggle();
                                $('#correct').fadeToggle();

                                var template = $(slides[TRADE.GameData.slideindex]).html();
                                
                                $("#slide_container").html(_.template(template));
                        }
                } else {
                        unlock = false;
                        $('#shadow').fadeToggle();
                        $('#incorrect').fadeToggle();
                }

                $.post('/problem/' + problemname + '/' + problemid + '/' + level + '/' + problemnumber + '/' + unlock, function (data) {
                                console.log('problem successfully updated');
                });
                //console.dir(this.model.attributes.answerid);

        }
});
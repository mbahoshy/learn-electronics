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

                        var level = $('#answer_container').data('level');
                        var problemname = $('#answer_container').data('problemname');
                        var problemid = $('#answer_container').data('problemid');
                        console.log("Correct Answer!");

                        if (slidesNumber === TRADE.GameData.slideindex) {
                                console.log("last problem");
                                
                        } else {
                                TRADE.GameData.slideindex ++;
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
                        $('#shadow').fadeToggle();
                        $('#incorrect').fadeToggle();
                }

                $.post('/problem/' + problemname + '/' + problemid + '/' + level + '/' + TRADE.GameData.slideindex + '/true/true', function (data) {
                                console.log('problem successfully updated');
                        });
                //console.dir(this.model.attributes.answerid);

        }
});
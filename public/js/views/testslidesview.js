TRADE.TestSlides = Backbone.View.extend({
        tagName: 'div',
        className: 'test-holder',
        template: _.template("<div class='question-txt'><%= questiontxt %></div>"),
        optiontemplate: _.template("<div data-optionid='<%= optionid %>' class='option-txt'><%= optionid %>. <%= optiontxt %></div>"),
        navtemplate: _.template("<div class='option-nav'>QUESTION <%= (currentquestion + 1) %> OF <%= numquestions %></div>"),
        submittemplate: _.template("<div class='option-submit'><div id='submit_option' data-qid='<%= qid %>' >Submit</div></div>"),
        timertemplate: _.template("<div id='test_timer'><%= mins %> : <%= secs %></div>"),
        events: {
                "mouseover .option-txt": "lessonMouseover",
                "mouseout .option-txt": "lessonMouseout",
                "click .option-txt": "selectOption",
                "click .active-submit-option": "submitOption"
        },
        lessonMouseover: function (e) {
                $(e.currentTarget).addClass('option-hover');

        },
        lessonMouseout: function (e) {
                $(e.currentTarget).removeClass('option-hover');

        },
        selectOption: function (e) {
                var answer = $(e.currentTarget).data('optionid');
                $('.active-option').removeClass('active-option');
                $(e.currentTarget).addClass('active-option');
                $('#submit_option').addClass('active-submit-option');
                $('#submit_option').data('optionid', answer);
                console.log(answer);
        },
        submitOption: function (e) {
                var optionid,
                    questionid,
                    numquestions,
                    completed,
                    that = this;

                numquestions = this.collection.models.length;
                optionid = $('#submit_option').data('optionid');
                questionid = $('#submit_option').data('qid');

                console.log(numquestions);
                if (numquestions == (this.collection.questionindex + 1 )) {
                    completed = true;
                } else {
                    completed = false;
                }

                console.dir();

                $.post('/test/' + this.collection.testid + '/' + optionid + '/' + questionid + '/' + completed + '/' + numquestions, function (){
                    console.log("Test successfully updated!");
                    var detached = $('#test_timer').detach();
                    $(that.el).html('');
                    that.collection.questionindex++;
                    that.render();
                    $(that.el).prepend(detached);
                })
        },
        render : function (qindex) {
                var questionindex,
                    questiontxt,
                    numquestions,
                    qid,
                    options;

                numquestions = this.collection.models.length;

                if (this.collection.questionindex) {
                    if (this.collection.questionindex === numquestions) {
                        console.log('the end');
                        TRADE.router.navigate('#/testReport/' + this.collection.testid, {trigger: true});
                        return;
                    }
                    questionindex = this.collection.questionindex;
                } else {
                    questionindex = qindex;
                    this.collection.questionindex = qindex;
                }
                console.dir(this.collection);
                questiontxt = this.collection.models[questionindex].attributes.qtxt;
                qid = this.collection.models[questionindex].attributes.qid;
                console.log(qid);
                options = this.collection.models[questionindex].attributes.options;


 
                // order is important !!!
                this.$el.append(this.template({questiontxt: questiontxt}));
                options.forEach(this.renderOptions, this);
                this.$el.append(this.submittemplate ({qid: qid}));
                this.$el.append(this.navtemplate({currentquestion: questionindex, numquestions: numquestions}));
        },

        renderOptions: function (model) {
            this.$el.append(this.optiontemplate(model));
        },
        setTimer: function () {
            var mins,
                secs,
                t,
                that = this,
                count = 30;

            console.log("collection");
            console.dir(this.collection);

            clearInterval(TRADE.router.intervals.timer);
            t = getMinutes(count);

            this.$el.prepend(this.timertemplate(t));

            console.dir(mins + secs);
            $('#test_timer').html(mins + ' : ' + secs);
            
            TRADE.router.intervals.timer = setInterval(tick, 1000);

            function tick () {
                var optionid,
                    questionid,
                    completed;

                count--;

                if (count <= 0) {
                    optionid = $('#submit_option').data('optionid');
                    questionid = $('#submit_option').data('qid');

                    if (!optionid) {
                        console.log("no option selected");
                        optionid = null;
                    }

                    clearInterval(TRADE.router.intervals.timer);
                    $('#test_timer').html('END');
                    completed = true;
                     $.post('/test/' + that.collection.testid + '/' + optionid + '/' + questionid + '/' + completed + '/' + that.collection.models.length, function (){
                        console.log("Test over");

                        TRADE.router.navigate('#/testReport/' + that.collection.testid, {trigger: true});
                    })
                    return;
                }
                
                console.log(count);
                t = getMinutes(count);

                $('#test_timer').html(t.mins + ' : ' + t.secs);
            }

            function getMinutes (remaining) {
                mins = Math.floor(count/60);
                secs = Math.floor(count%60);

                if (secs < 10) {
                    secs = "0" + secs;
                }

                if (mins < 1 && secs < 20) {
                    $('#test_timer').addClass('red');
                }

                return {mins: mins, secs: secs};
            }
        }
});
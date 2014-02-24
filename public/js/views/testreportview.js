TRADE.TestReport = Backbone.View.extend({
        tagName: 'div',
        className: 'test-holder test-report',
        titletemplate: _.template("<h3>Test Report</h3>"),
        template: _.template("<div class='test-result-footer'><div class='review-test'>Review Test</div><a href='#/class/<%= classid %>'><div class='finish-test'>Done</div></div></a>"),
        events: {
                "mouseover .option-txt": "lessonMouseover",
                "mouseout .option-txt": "lessonMouseout",
                "click .option-txt": "selectOption",
                "click .active-submit-option": "submitOption"
        },
        render: function () {
                this.$el.append(this.titletemplate);
                this.collection.counter = 1;
                
                var testresultsmiddle = new TRADE.TestResultsMiddle({collection: this.collection});
                testresultsmiddle.render();
                this.$el.append(testresultsmiddle.$el);
                this.$el.append(this.template ({classid: this.collection.classid}));

        },
        renderQuestion: function (model) {
                console.dir(model);
                this.$el.append(this.template({model: model.attributes, counter: this.collection.counter}));
                this.collection.counter ++;
        }

});

TRADE.TestResults = Backbone.View.extend({
        tagName: 'div',
        className: 'fleft',
        template: _.template("<div class='result-img'><%= counter %> . <img src='/imgs/checkOk.png' /></div>"),
        templateErr: _.template("<div class='result-img'><%= counter %> . <img src='/imgs/checkErr.png' /></div>"),
        render: function () {
                this.collection.counter = 1;
                this.numcorrect = 0;
                this.collection.forEach(this.renderQuestion, this);
                return this.numcorrect;

        },
        renderQuestion: function (model) {
                console.dir(model);
                if (model.attributes.correct === true) {
                        this.$el.append(this.template({counter: this.collection.counter})); 
                        this.numcorrect ++;
                } else {
                        this.$el.append(this.templateErr({counter: this.collection.counter}));  
                }
                
                this.collection.counter ++;
        }
});

TRADE.TestResultsMiddle = Backbone.View.extend({
        tagName: 'div',
        className: 'test-report-middle',
        template: _.template("<div class='fright'><div class='percentage'><%= percentage %>%</div><div class ='fright'><i><%= numcorrect %> of <%= numquestions %> correct</i></div>"),
        render: function () {
                
                var testresults = new TRADE.TestResults({collection: this.collection});
                var numcorrect = testresults.render();
                this.$el.append(testresults.$el);
                
                var numquestions = this.collection.numberOfQuestions;
                var percentage = Math.floor((numcorrect/numquestions)*100);
                console.log(percentage);
                this.$el.append(this.template({percentage: percentage, numcorrect: numcorrect, numquestions: numquestions}));
                
        },

});

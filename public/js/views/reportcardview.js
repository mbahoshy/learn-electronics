TRADE.ReportCardView = Backbone.View.extend({
        tagName: 'div',
        className: 'report-card',
        titletemplate: _.template("<h3>Report Card</h3>"),
        template: _.template("<div class=''><%= title %></div>"),
        events: {
                "mouseover .option-txt": "lessonMouseover",

        },
        render: function (user) {
                console.dir(user);
                this.user = user;
                this.$el.append(this.titletemplate);
                this.collection.forEach(this.renderReport, this);
                console.dir(this.collection);
        },
        renderReport: function (model) {
               var tag = model.attributes.tag;
               var questionresults = [];
               var problemresults = [];
               this.user.testProgress.forEach(function (test) {
                        var length = test.score.length;
                        for (var i = 0; i <length; i ++) {
                                var numtags = test.score[i].tags.length;
                                for (var b = 0; b<numtags; b++) {
                                        if (test.score[i].tags[b] == tag) {
                                                questionresults.push(test.score[i].correct);
                                        }
                                }
                        }
               });

               this.user.problemProgress.forEach(function (problem){
                        var length = problem.score.length;
                        for (var i = 0; i<length; i++) {
                                var numtags = problem.score[i].tags.length;
                                for (var b = 0; b<numtags; b++) {
                                        if (problem.score[i].tags[b] == tag) {
                                                problemresults.push(problem.score[i].attempts);
                                        }
                                }
                        }

               });

               var numcorrect = 0;
               var numquestions = questionresults.length;
               for (var i = 0; i <numquestions; i ++) {
                        if (questionresults[i] == true) {
                                numcorrect++;
                        }
               }

               var avgattempts = 0;
               var numproblems = problemresults.length;
               for(var i = 0; i <numproblems; i ++) {
                avgattempts += problemresults[i];
               }

               avgattempts = Math.floor((avgattempts/numproblems)*100)/100;

               model.numquestions = numquestions;
               model.numcorrect = numcorrect;

               model.numproblems = numproblems;
               model.avgattempts = avgattempts;

               var problempar = Math.floor((1 / avgattempts)*100)/100;
               var ratiocorrect = Math.floor((numcorrect/numquestions)*100)/100;
               var progress = Math.floor(((problempar + ratiocorrect)/2)*100);
               console.log(progress);

               this.$el.append(this.template({title: model.attributes.title}));
        }

});
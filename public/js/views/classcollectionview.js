TRADE.ClassCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'fleft',
 
        render : function () {
                this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {

                if (model.toJSON().active === true) {
                    var ClassView1 = new TRADE.ClassView({ model: model });
                } else {
                    var ClassView1 = new TRADE.ClassViewInactive({ model: model }); 
                }

                this.$el.append(ClassView1.render().el);
        }
});

TRADE.ClassCollectionReport = Backbone.View.extend({
        tagName: 'div',
        className: 'report_card_holder',
        template: _.template('<div id="report_card_header"><%= name %><br>Lessons Completed: <%= lessonscompleted %> Lessons Remaining: <%= lessonsremain %><br>Problems Completed: <%= problemscompleted %><br>Average Attempts: <%= averageattempts %></div>'),

        events: {

        },
        initialize : function () {

        },
        render : function (user) {
                var progress = {};
                progress.lessonscompleted = user.lessonProgress.length;
                var problemscompleted = 0;
                _.each(user.problemProgress, function (element, index){
                    if (element.numberOfQuestions == element.unlocked.length) {
                        problemscompleted ++;
                    }
                });
                progress.problemscompleted = problemscompleted;

                var totalquestions = 0;
                var totalattempts = 0;
                var totallessons = 0;
                
                _.each(this.collection.models, function (element, index) {
                    _.each(element.attributes.chapters, function (element, index) {
                        totallessons += element.lessons.length;
                    });
                });
                progress.lessonsremain = (totallessons - progress.lessonscompleted);
                _.each(user.problemProgress, function (element, index){
                    totalquestions += element.score.length;
                    var attempts = _.reduce(element.score, function(memo, num) {return memo + num;}, 0);
                    totalattempts += attempts;
                })

             
                var averageattempts = (Math.floor(totalattempts * 100)/100)/totalquestions;
                progress.averageattempts = averageattempts;
                $(this.el).prepend(this.template(progress));
                this.user = user;
                this.collection.models.forEach(this.addOne, this);
                

        },

        addOne: function (model) {

                var lessonscompleted = _.where(this.user.lessonProgress, {classid: model.attributes._id}).length;
                model.attributes.lessonscompleted = lessonscompleted
                var classproblems = _.where(this.user.problemProgress, {classid: model.attributes._id});
                
                var problemscompleted = 0;
                _.each(classproblems, function (element, index){
                    if (element.numberOfQuestions == element.unlocked.length) {
                        problemscompleted ++;
                    }
                });
                var totalquestions = 0;
                var totalattempts = 0;
                var totallessons = 0;
                
                _.each(model.attributes.chapters, function(element, index) {
                    totallessons += element.lessons.length;
                });
                model.attributes.lessonsremain = (totallessons - lessonscompleted);
                // console.log('total lessons ' + totallessons);
                _.each(classproblems, function (element, index){
                    totalquestions += element.score.length;
                    var attempts = _.reduce(element.score, function(memo, num) {return memo + num;}, 0);
                    totalattempts += attempts;
                })

                
                var averageattempts = (Math.floor(totalattempts * 100)/100)/totalquestions;
                model.attributes.averageattempts = averageattempts;
                model.attributes.problemscompleted = problemscompleted;

                var ChapterReportView1 = new TRADE.ChapterReportView({ model: model });
                this.$el.append(ChapterReportView1.render().el);   

                // this.$el.append( this.template(model.attributes));

                

                // var ClassView1 = new TRADE.ClassView({ model: model });
                // this.$el.append(ClassView1.render().el);
        }


});
TRADE.ClassTitleView = Backbone.View.extend({
        tagName: 'div',
        className: 'class-title fleft',
        template: _.template("<h1><%= name %> Classroom - <i><%= snippet %></i></h1>"),   
        render : function () {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        },

});

TRADE.ClassView = Backbone.View.extend({
        tagName: 'div',
        className: 'classroom-card',
        template: _.template("<h3><%= name %></h3><div class='chapter-description'><p><label>DESCRIPTION:</label> <%= snippet %></p></div>"),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout",
                "click": "tester"
        },
        chapterMouseover: function () {
                $(this.el).addClass('card-hover');
        },

        chapterMouseout: function () {
                $(this.el).removeClass('card-hover');
        },
        tester: function () {
                console.dir(this.model.toJSON()._id);
                TRADE.router.navigate('#class/' + this.model.toJSON()._id, {trigger:true});
        },
        render : function () {
                var user = this.model.user;
                this.$el.html( this.template(this.model.toJSON()) );
                console.dir(this.model);
                console.dir(this.model.user);
                var x = _.where(user.lessonProgress, {classid : this.model.attributes._id, completed:true}).length;
                var y = _.where(user.problemProgress, {classid : this.model.attributes._id, completed:true}).length;
                var y = _.where(user.testProgress, {classid : this.model.attributes._id, completed:true}).length;

                var numcompleted = x + y + x;
                var total = this.model.attributes.total;

                var percent = Math.floor((numcompleted/total)*100);
                console.dir('percent');
                console.dir(percent);
                if (percent>= 0 && percent <15) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_0.png' />");
                } else if (percent>= 15 && percent <30) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_1.png' />");
                } else if (percent>= 30 && percent <44) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_2.png' />");
                } else if (percent>= 44 && percent <58) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_3.png' />");
                } else if (percent>= 58 && percent <72) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_4.png' />");
                } else if (percent>= 72 && percent <86) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_5.png' />");
                } else if (percent>= 86 && percent <100) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_6.png' />");
                } else if (percent === 100) {
                    this.$el.prepend("<img class='battery' src='/imgs/battery_7.png' />");
                }

                return this;
        }
});

TRADE.ClassViewInactive = Backbone.View.extend({
        tagName: 'div',
        className: 'class-list',
        template: _.template("<div class='class-item inactive' ><h3><%= name %></h3><p><%= snippet %></p><p><b>Topics Covered:</b></p></div>"),

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
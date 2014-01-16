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
                var x = _.where(user.lessonProgress, {classid : this.model.attributes._id, completed:true});
                var y = _.where(user.problemProgress, {classid : this.model.attributes._id, completed:true});
                console.dir(x);
                console.dir(y);
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
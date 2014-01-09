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
        template: _.template("<h3><%= name %></h3><p><label>LEVEL:</label> </p><p><label>DESCRIPTION:</label> <%= snippet %></p><p><b>Topics Covered:</b></p>"),
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
                this.$el.html( this.template(this.model.toJSON()) );
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
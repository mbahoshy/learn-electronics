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
        className: 'class-list',
        template: _.template("<div class='class-item'><h1><%= name %></h1><h2><%= snippet %></h2></div>"),
        events: {
                "mouseover": "chapterMouseover",
                "mouseout": "chapterMouseout",
                "click": "tester"
        },
        chapterMouseover: function () {
                $(this.el).children().addClass('card-hover');
        },

        chapterMouseout: function () {
                $(this.el).children().removeClass('card-hover');
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
        template: _.template("<div class='class-item inactive' ><h1><%= name %></h1><h2><%= snippet %></h2></div>"),

        render : function () {
                this.$el.html( this.template(this.model.toJSON()) );
                return this;
        }
});
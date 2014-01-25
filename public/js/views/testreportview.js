TRADE.TestReport = Backbone.View.extend({
        tagName: 'div',
        className: 'test-report',
        template: _.template("<div><%= correct %></div>"),
        events: {
                "mouseover .option-txt": "lessonMouseover",
                "mouseout .option-txt": "lessonMouseout",
                "click .option-txt": "selectOption",
                "click .active-submit-option": "submitOption"
        },
        render: function () {
                this.collection.forEach(this.renderQuestion, this);

        },
        renderQuestion: function (model) {
                console.dir(model);
                this.$el.append(this.template(model.attributes));
        }

})
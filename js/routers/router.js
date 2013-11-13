TRADE.Router = Backbone.Router.extend({
    routes: {
        "chapterview": "chapterlistview",
        "second": "secondRoute",
        "manual-list": "manualResults"
    },

    chapterlistview: function () {
        
    },

});

TRADE.router = new TRADE.Router();
Backbone.history.start({root: "/"});
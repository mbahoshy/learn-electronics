TRADE.Router = Backbone.Router.extend({
    routes: {
        "chapterview": "chapterlistview",
        "second": "secondRoute",
        "manual-list": "manualResults"
    },

    chapterlistview: function () {
        TRADE.ChapterCollection1 = new TRADE.ChapterCollection ();
        TRADE.ChapterCollection1.fetch({
            success: function () {
                console.dir(TRADE.ChapterCollection1);
                TRADE.ChapterListView1 = new TRADE.ChapterListView ({collection: TRADE.ChapterCollection1});
                TRADE.ChapterListView1.render();
                $('#wrapper').append(TRADE.ChapterListView1.$el);
            }
        });
    },

});

TRADE.router = new TRADE.Router();
Backbone.history.start({root: "/"});
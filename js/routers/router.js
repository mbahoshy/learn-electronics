TRADE.Router = Backbone.Router.extend({
    routes: {
        "HVAC": "HVACChapterView",
        "HVAC/:id": "lessonRoute"
    },

    HVACChapterView: function () {
        TRADE.ChapterCollection1 = new TRADE.ChapterCollection ();
        TRADE.ChapterCollection1.fetch({
            success: function () {
                console.dir(TRADE.ChapterCollection1);
                TRADE.ChapterListView1 = new TRADE.ChapterListView ({collection: TRADE.ChapterCollection1});
                TRADE.ChapterListView1.render();
                $('#wrapper').append(TRADE.ChapterListView1.$el);
            }
        });

        $.get("/users/2", function(data, status){
            console.dir(data);
            TRADE.user1 = new TRADE.User (data);
            TRADE.cardView1 = new TRADE.UserView ({model: TRADE.user1});
            TRADE.cardView1.render();
            $('#wrapper').append(TRADE.cardView1.$el);
        });

        $.get("/class/0", function(data, status){
            console.dir(data);
            TRADE.class1 = new TRADE.Classroom (data);
            TRADE.classview1 = new TRADE.ClassTitleView ({model: TRADE.class1});
            TRADE.classview1.render();
            $('#wrapper').prepend(TRADE.classview1.$el);
        });

    },

    lessonRoute: function (id) {
        $('#wrapper').html(id);
        console.dir(id);
    },

});

TRADE.router = new TRADE.Router();
Backbone.history.start({root: "/"});
TRADE.Router = Backbone.Router.extend({
    routes: {
        ":classid": "HVACClassView",
        "lessons/:chapterid": "HVACChapterView"
    },
    classid: '',
    classname: '',
    chapterid: '',
    chaptername: '',
    HVACClassView: function (classid) {
        console.log('hello');

        $.get("/chapters/" + classid, function(data, status){
            TRADE.ChapterCollection1 = new TRADE.ChapterCollection ();
            TRADE.ChapterCollection1.reset(data);

            TRADE.ChapterListView1 = new TRADE.ChapterListView ({collection: TRADE.ChapterCollection1});
            TRADE.ChapterListView1.render();
            $('#wrapper').append(TRADE.ChapterListView1.$el);

            
        });

        $.get("/users/2", function(data, status){
            TRADE.user1 = new TRADE.User (data);
            TRADE.cardView1 = new TRADE.UserView ({model: TRADE.user1});
            TRADE.cardView1.render();
            $('#wrapper').append(TRADE.cardView1.$el);
        });

        $.get("/class/" + classid, function(data, status){
            TRADE.class1 = new TRADE.Classroom (data);
            TRADE.classview1 = new TRADE.ClassTitleView ({model: TRADE.class1});
            TRADE.classview1.render();
            $('#wrapper').prepend(TRADE.classview1.$el);
            this.classid = data.id;
            this.classname = data.name;
        });

        //alert(this.currentclass.name);
    },

    HVACChapterView: function (chapterid) {
        $.get("/lessons/" + chapterid, function(data, status){
            TRADE.LessonCollection1 = new TRADE.LessonCollection ();
            TRADE.LessonCollection1.reset(data);

            TRADE.LessonListView1 = new TRADE.LessonListView ({collection: TRADE.LessonCollection1});
            TRADE.LessonListView1.render();
            $('#wrapper').append(TRADE.LessonListView1.$el);
        });

        console.dir(chapterid);
    },

});

TRADE.router = new TRADE.Router();
Backbone.history.start({root: "/"});
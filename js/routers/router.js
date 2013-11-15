TRADE.Router = Backbone.Router.extend({
    routes: {
        ":classid": "HVACChapterListView",
        "lessons/:chapterid": "HVACLessonListView"
    },

    HVACChapterListView: function (classid) {

        $('#wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html

        $.get("/class/" + classid, function(data, status){ //get chapter info and render chapter cards

            //creates classroom title view and renders
            TRADE.class1 = new TRADE.Classroom (data);
            TRADE.classview1 = new TRADE.ClassTitleView ({model: TRADE.class1});
            TRADE.classview1.render();

            //creates chapter list view and render chapter cards
            TRADE.ChapterCollection1 = new TRADE.ChapterCollection ();
            TRADE.ChapterCollection1.reset(data.chapters);
            TRADE.ChapterListView1 = new TRADE.ChapterListView ({collection: TRADE.ChapterCollection1});
            TRADE.ChapterListView1.render();

            //append to dom
            $('#wrapper').append(TRADE.ChapterListView1.$el);
            $('#title_wrapper').append(TRADE.classview1.$el);
            TRADE.NavData = data;
        });
      
        $.get("/users/2", function(data, status){ //get user info and render user card
            TRADE.user1 = new TRADE.User (data);
            TRADE.cardView1 = new TRADE.UserView ({model: TRADE.user1});
            TRADE.cardView1.render();
            $('#wrapper').append(TRADE.cardView1.$el);
        });

    },

    HVACLessonListView: function (chapterid) {

        //clear html
        $('#wrapper').html('');
        $('#title_wrapper').html('');
        console.dir(TRADE.NavData);
        var record = _.findWhere(TRADE.NavData.chapters, {chapterid: chapterid});
        console.dir(record);

        //creates classroom title view and renders
        TRADE.chaptertitle1 = new TRADE.Chapter (record);
        TRADE.chaptertitleview1 = new TRADE.ChapterTitleView ({model: TRADE.chaptertitle1});
        TRADE.chaptertitleview1.render();

        TRADE.LessonCollection1 = new TRADE.LessonCollection ();
        TRADE.LessonCollection1.reset(record.lessons);

        TRADE.LessonListView1 = new TRADE.LessonListView ({collection: TRADE.LessonCollection1});
        TRADE.LessonListView1.render();
        $('#wrapper').append(TRADE.LessonListView1.$el);
        $('#title_wrapper').append(TRADE.chaptertitleview1.$el);

    },

});

TRADE.router = new TRADE.Router();
Backbone.history.start({root: "/"});



        //get class info and render title card
        /*$.get("/find/" + classid, function(data, status){
            TRADE.class1 = new TRADE.Classroom (data);
            TRADE.classview1 = new TRADE.ClassTitleView ({model: TRADE.class1});
            TRADE.classview1.render();
            $('#wrapper').prepend(TRADE.classview1.$el);
            this.classid = data.id;
            this.classname = data.name;
        });*/
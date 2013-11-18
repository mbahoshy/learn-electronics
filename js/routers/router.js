TRADE.Router = Backbone.Router.extend({
    routes: {
        ":classid": "HVACChapterListView",
        "lessons/:chapterid": "HVACLessonListView",
        "slides/:lessonid": "HVACSlideView"
    },

    HVACChapterListView: function (classid) {

        $('#wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html
        
        $.get("/class/" + classid, function(data, status){ //get chapter info and render chapter cards

            //creates classroom title view and renders
            var class1 = new TRADE.Classroom (data);
            var classview1 = new TRADE.ClassTitleView ({model: class1});
            classview1.render();
            
            //creates chapter list view and render chapter cards
            var ChapterCollection1 = new TRADE.ChapterCollection ();
            ChapterCollection1.reset(data.chapters);
            var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
            ChapterListView1.render();

            //append to dom
            $('#wrapper').append(ChapterListView1.$el);
            $('#title_wrapper').append(classview1.$el);

            //sets nav data to variable
            TRADE.NavData = data;
            TRADE.Class = classid; // manage with cookies
            
        });
        
        $.get("/users/2", function(data, status){ //get user info and render user card

            //creates user card and renders
            var user1 = new TRADE.User (data);
            var cardView1 = new TRADE.UserView ({model: user1});
            cardView1.render();
            $('#wrapper').append(cardView1.$el);

            //sets user data to variable
            TRADE.UserData = _.findWhere(data.progress, {classroomid: classid});

        });
        
    },

    HVACLessonListView: function (chapterid) {

        //clear html
        $('#wrapper').html('');
        $('#title_wrapper').html('');

        //uses TRADE.NavData to find chapter -- uses TRADE.UserData to find user progress for chapter
        var record = _.findWhere(TRADE.NavData.chapters, {chapterid: chapterid});
        var userrecord = _.findWhere(TRADE.UserData.progress, {chapterid: chapterid});

        //creates chapter title view and renders
        var chaptertitle1 = new TRADE.ChapterModel (record);
        var chaptertitleview1 = new TRADE.ChapterTitleView ({model: chaptertitle1});
        chaptertitleview1.render();
        
        //creates lesson list view and renders
        var LessonCollection1 = new TRADE.LessonCollection ();
        LessonCollection1.reset(record.lessons); //loads collection with lessons from chapter
        var LessonListView1 = new TRADE.LessonListView ({collection: LessonCollection1});
        LessonListView1.render();

        //creates chapter title view and renders
        var userchapter1 = new TRADE.User (userrecord);
        var userchapterview1 = new TRADE.UserChapterView ({model: userchapter1});
        userchapterview1.render();


        //append to dom
        $('#wrapper').append("<div id='lesson_list_container'></div>")
        $('#lesson_list_container').append(LessonListView1.$el);
        $('#lesson_list_container').append(userchapterview1.$el);
        $('#title_wrapper').append(chaptertitleview1.$el);

        TRADE.ChapterData = chapterid; // manage with cookies

    },

    HVACSlideView: function (lessonid) {

        $('#wrapper').html('');
        $('#title_wrapper').html('');


        var record = _.findWhere(TRADE.NavData.chapters, {chapterid: TRADE.ChapterData});
        var lesson_record = _.findWhere(record.lessons, {lessonid: lessonid});



         $.get('/json/' + lesson_record.slides, function(data, status) {
            TRADE.gamejson = data;
            console.dir(TRADE.gamejson);
        
        
         });

        $.get('/slideTemplate', function(data, status) {
            console.dir(data);

            var template = $(data).html();
            $("#wrapper").prepend(_.template(template));
            $('.slide-left').on('click', slideChange);
            $('.slide-right').on('click', slideChange);
            
        });
            


        $.get('/slides/' + lesson_record.slides, function(data, status){

            $('#wrapper').append('<div class="hidden">' + data + '</div>');
            var slides = $('#slide_holder > .slide');

            var template = $(slides[0]).html();
            TRADE.SlideIndex = 0; //manage with cookies
        
            $("#slide_container").html(_.template(template));
            slideIndexNav();
            $('#slide_nav_' + TRADE.SlideIndex).addClass('slide-active');
        });
       
        //TRADE.Lesson = lessonid;
    }
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
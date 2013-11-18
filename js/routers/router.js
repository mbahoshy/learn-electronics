TRADE.Router = Backbone.Router.extend({
    routes: {
        ":classid": "HVACChapterListView",
        "lessons/:chapterid": "HVACLessonListView",
        "slides/:lessonid": "HVACSlideView"
    },

    HVACChapterListView: function (classid) {

        $('#wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html
        
        if(TRADE.NavObj == '') {
            
            $.get("/class/" + classid, function(data, status){ //get chapter info and render chapter cards
                TRADE.NavObj = data;
                console.dir(TRADE.NavObj);
                TRADE.NavData.classid = classid; // manage with cookies
                renderChapters();        
            });
        } else {
            
            renderChapters();
        }
        
        $.get("/users/2", function(data, status){ //get user info and render user card

            //creates user card and renders
            var user1 = new TRADE.User (data);
            var cardView1 = new TRADE.UserView ({model: user1});
            cardView1.render();
            $('#wrapper').append(cardView1.$el);

            //sets user data to variable
            TRADE.UserData = _.findWhere(data.progress, {classroomid: classid});

        });
  
        function renderChapters () {
            //creates classroom title view and renders
            var class1 = new TRADE.Classroom (TRADE.NavObj);
            var classview1 = new TRADE.ClassTitleView ({model: class1});
            classview1.render();
            
            //creates chapter list view and render chapter cards
            var ChapterCollection1 = new TRADE.ChapterCollection ();
            ChapterCollection1.reset(TRADE.NavObj.chapters);
            var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
            ChapterListView1.render();

            //append to dom
            $('#wrapper').append(ChapterListView1.$el);
            $('#title_wrapper').append(classview1.$el);
        }


    },

    HVACLessonListView: function (chapterid) {

        //clear html
        $('#wrapper').html('');
        $('#title_wrapper').html('');
        if(TRADE.NavObj == '') {
            $.get("/class/reset", function(data, status){ //get chapter info and render chapter cards
                TRADE.NavObj = data;
                renderLessons();      
            });
        } else {
            renderLessons();
        }
        if(TRADE.UserData == ''){
            console.log("vaginers");
            $.get("/nav/classid", function(data, status){
                TRADE.NavData.classid = data;
                console.dir('class id' + TRADE.NavData.classid);
                
                (function () {
                    $.get("/users/2", function(data, status){ //get user info and render user card
                        console.dir(data);
                        TRADE.UserData = _.findWhere(data.progress, {classroomid: TRADE.NavData.classid});;
                       
                        renderUserLesson();
                     });   
                })();

            });

                      
        } else {
            renderUserLesson();
        }
        function renderLessons () {
            //uses TRADE.NavData to find chapter -- uses TRADE.UserData to find user progress for chapter
            var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: chapterid});

            //creates chapter title view and renders
            var chaptertitle1 = new TRADE.ChapterModel (record);
            var chaptertitleview1 = new TRADE.ChapterTitleView ({model: chaptertitle1});
            chaptertitleview1.render();
            
            //creates lesson list view and renders
            var LessonCollection1 = new TRADE.LessonCollection ();
            LessonCollection1.reset(record.lessons); //loads collection with lessons from chapter
            var LessonListView1 = new TRADE.LessonListView ({collection: LessonCollection1});
            LessonListView1.render();

            //append to dom
            $('#wrapper').append("<div id='lesson_list_container'></div>");
            $('#lesson_list_container').append(LessonListView1.$el);
            $('#title_wrapper').append(chaptertitleview1.$el);
        }

        function renderUserLesson () {
            console.log(chapterid);
            var userrecord = _.findWhere(TRADE.UserData.progress, {chapterid: chapterid});
            console.dir(userrecord);
            //creates chapter title view and renders
            var userchapter1 = new TRADE.User (userrecord);
            var userchapterview1 = new TRADE.UserChapterView ({model: userchapter1});
            userchapterview1.render();
            $('#lesson_list_container').append(userchapterview1.$el);
        }
        TRADE.NavData.chapterid = chapterid; // manage with cookies

    },

    HVACSlideView: function (lessonid) {

        //clear html
        $('#wrapper').html('');
        $('#title_wrapper').html('');


        var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: TRADE.NavData.chapterid});
        var lesson_record = _.findWhere(record.lessons, {lessonid: lessonid});


        // loads json for game
        $.get('/json/' + lesson_record.slides, function(data, status) {
            TRADE.GameData.gamejson = data;
            slideTemplate();

        });

        //loads outer slide template after json is complete
        function slideTemplate () {
            $.get('/slideTemplate', function(data, status) {
                console.dir(data);

                var template = $(data).html();
                $("#wrapper").prepend(_.template(template));
                $('.slide-left').on('click', TRADE.FUNC.slideChange);
                $('.slide-right').on('click', TRADE.FUNC.slideChange);
                slides();
            });
        } 

        //loads individual slides after slide template is loaded
        function slides () {
            $.get('/slides/' + lesson_record.slides, function(data, status){

                $('#wrapper').append('<div class="hidden">' + data + '</div>');
                var slides = $('#slide_holder > .slide');

                var template = $(slides[0]).html();
                TRADE.GameData.slideindex = 0; //manage with cookies
            
                $("#slide_container").html(_.template(template));
                TRADE.FUNC.slideIndexNav();
                $('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
            });
        }
       
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
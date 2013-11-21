TRADE.Router = Backbone.Router.extend({
    routes: {
        ":classid": "HVACChapterListView",
        "lessons/:chapterid": "HVACLessonListView",
        "slides/:lessonid": "HVACSlideView"
    },

    HVACChapterListView: function (classid) {

        $('#wrapper').html(''); //clear html
        $('#title_wrapper').html(''); //clear html

        $( document ).ready(function() {
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
                console.dir(data.progress);
                console.log("classid " + classid);
                TRADE.UserData = _.findWhere(data.progress, {classroomid: classid});
                console.log(TRADE.UserData);

            });
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
        
        $( document ).ready(function() {
            $('#wrapper').append("<div id='lesson_list_container'></div>");

            if(TRADE.NavObj == '') {
                $.get("/class/reset", function(data, status){ //get chapter info and render chapter cards
                    TRADE.NavObj = data;
                    renderLessons();      
                });
            } else {
                renderLessons();
            }
            if(TRADE.UserData == ''){
                $.get("/nav/classid", function(data, status){
                    TRADE.NavData.classid = data;
                                       
                    (function () {
                        $.get("/users/2", function(data, status){ //get user info and render user card

                            TRADE.UserData = _.findWhere(data.progress, {classroomid: TRADE.NavData.classid});
                            renderUserLesson();
                         });   
                    })();

                });

                          
            } else {
                renderUserLesson();
            }
            TRADE.NavData.chapterid = chapterid; // manage with cookies
        });

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
        

    },

    HVACSlideView: function (lessonnum) {

        //clear html
        $('#wrapper').html('');
        $('#title_wrapper').html('');



        if(TRADE.NavObj == '') { //if NavObj is empty request new navdata from server
            $.get("/nav/lessonid", function(data, status){ //refreshes lessonid
                TRADE.NavData.lessonid = data;
                slideType();
            });
            function slideType () {
                $.get("/nav/lessontype", function(data, status){
                    TRADE.NavData.lessontype = data;
                    getJson();
                    slideTemplate();
                });
            }
        } else {
            var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: TRADE.NavData.chapterid});
            var lesson_record = _.findWhere(record.lessons, {lessonid: lessonnum});
            TRADE.NavData.lessonid = lesson_record.slides;
            TRADE.NavData.lessontype = lesson_record.lessontype;
            console.log(TRADE.NavData.lessontype);
            getJson();
            slideTemplate();
        }
        

        function getJson () {
            // loads json for game
            $.get('/json/' + TRADE.NavData.lessonid, function(data, status) {
                TRADE.GameData.gamejson = data;
            });
        }

        //loads outer slide template after json is complete
        function slideTemplate () {
            $.get('/slideTemplate/' + TRADE.NavData.lessontype, function(data, status) {
                console.dir(data);

                var template = $(data).html();
                $("#wrapper").prepend(_.template(template));
                slides();
            });
        } 

        //loads individual slides after slide template is loaded
        function slides () {
            $.get('/slides/' + TRADE.NavData.lessonid + '/' + TRADE.NavData.lessontype, function(data, status){

                $('#wrapper').append('<div class="hidden">' + data + '</div>');
                var slides = $('#slide_holder > .slide');

                var template = $(slides[0]).html();
                TRADE.GameData.slideindex = 0; //keeps track of current slide
                
                $("#slide_container").html(_.template(template));
                if (TRADE.NavData.lessontype === 'lesson') {
                    
                    $('.slide-left').on('click', TRADE.FUNC.slideChange);
                    $('.slide-right').on('click', TRADE.FUNC.slideChange);
                    TRADE.FUNC.slideIndexNav();
                    $('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
                    
                } else if (TRADE.NavData.lessontype === 'problem') {
                    TRADE.FUNC.problemIndexNav();

                    //creates chapter list view and render chapter cards
                    var answercollection1 = new TRADE.AnswerCollection ();
                    answercollection1.reset(TRADE.GameData.answer);
                    var answerlistview1 = new TRADE.AnswerListView ({collection: answercollection1});
                    answerlistview1.render();

                    //append to dom
                    $('#answer_question').append(answerlistview1.$el);
                }
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
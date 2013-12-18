TRADE.Router = Backbone.Router.extend({
    routes: {
        "": "classroomFunction", //displays classes
        "class/:classid": "classFunction", //displays chapters
        // "chapter/:chapterid": "chapterFunction", //displays lessons
        "slides/:chapterid/:lessonid": "slideFunction",
        "problems/:level": "problemListFunction",
        "problemslides/:level/:problemname/:problemid": "problemSlideFunction",
        "report" : "reportFunction"
    },

    classroomFunction: function () {
        $('#body_container').html(''); //clear html
        $('#lesson_container').html(''); //clear html


        $.get("/getClasses", function(data, status){
            var classCollection1 = new TRADE.ClassCollection();
            classCollection1.reset(data);
            var classCollectionView1 = new TRADE.ClassCollectionView ({collection: classCollection1});
            classCollectionView1.render();
            $('#body_container').append(classCollectionView1.$el);
        });
    },

    classFunction: function (classid) {
        $('#body_container').html(''); //clear html
        $('#lesson_container').html(''); //clear html

        var user,
            nav,
            wait = 0;

        $.get("/getNav/" + classid, function(data, status){
            nav = data;
            wait ++;
            renderChapters();
        });

        $.get("/user", function(data, status){
            user = data;
            wait ++;
            renderChapters();

        });

        function renderChapters () {
            if (wait === 2) {
                var ChapterCollection1 = new TRADE.ChapterCollection ();
                ChapterCollection1.reset(nav.chapters);
                var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
                ChapterListView1.render(user, nav.name);

                //append to dom
                $('#body_container').prepend(ChapterListView1.$el);
            }
        }
    },

    slideFunction: function (chapterid, lessonid) {

        //clear html
        $('#body_container').html('');
        $('#lesson_container').html('');


        slideTemplate();

        //loads outer slide template after json is complete
        function slideTemplate () {
            $.get('/slideTemplate/lesson', function(data, status) {
              var template = $(data).html();
                $("#lesson_container").append(_.template(template));
                slides();
            });
        } 

        //loads individual slides after slide template is loaded
        function slides () {
            $.get('/slides/' + lessonid, function(data, status){

                $('#lesson_container').append('<div class="hidden">' + data + '</div>');
                var slides = $('#slide_holder > .slide');

                var template = $(slides[0]).html();
                TRADE.GameData.slideindex = 0; //keeps track of current slide
                
                $("#slide_container").html(_.template(template));
  
                    $('.slide-left').on('click', TRADE.FUNC.slideChange);
                    $('.slide-right').on('click', TRADE.FUNC.slideChange);
                    TRADE.FUNC.slideIndexNav();
                    $('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
                    $('#slide_container').on('click', ".finish", function () {
                        var date = new Date().getTime();

                        $.post('/user/' + chapterid + '/' + lessonid + '/' + date, function(data){
                            console.log('User updated successfully');
                        });
                        
                        TRADE.router.navigate('#', {trigger: true});
                        
                    });
                    
            });
        }
       
        //TRADE.Lesson = lessonid;
    },

    reportFunction: function () {
        $('#body_container').html('');
        $('#lesson_container').html('');
        var user,
            template,
            wait = 0;

        $.get("/user", function(data, status){
            user = data;
            wait ++;
            renderTemplate();
        });

        $.get("/template/reportcardtemplate", function (data, status){
            template = $(data).html();      
            wait ++;
            renderTemplate();
        });

        function renderTemplate () {
            if (wait === 2) {
                var rtemplate = _.template(template, user);
                $('#body_container').append(rtemplate);
            }
        }
    },

    problemListFunction: function (id) {
        var problems,
            wait = 0;

        // var activenav = $('#subnav_container').data('problemactivenav'); //grabs active nav
        // var exists = $('#problem_subnav').data("exists"); //checks if template exists

        // if (!exists && !activenav) { 
        //     level = level0;
        // } else if (!exists) {//assigns correct level to be shown
        //     level = activenav;
        // } else {
        //     level = level0;
        // }
        $('#body_container').html('');
        $('#lesson_container').html('');

        $.get("/problems/" + id , function(data, status){ //gets a list of problems for level
            problems = data;
            console.dir(problems);
            wait ++;
            renderProblems();
        });

        $.get("/user", function(data, status){
                TRADE.UserData = data;
                wait ++;
                renderProblems();
        });

        $.get("/template/problemlisttemplate", function (data, status){
            template = $(data).html();
            renderTemplate();
            wait ++;
            renderProblems();
        });

        // if (!exists) { //clears html if page does not exists
           
            
        // } else {
        //     
        //     wait ++;
        //     renderProblems();
        // }

        

        function renderProblems () {
            if (wait === 3) {
                var findLevel = _.where(problems.list, {problemlevel:"Rookie"});
                // $('#subnav_container').data('problemactivenav', level);
                var problemCollection1 = new TRADE.ProblemCollection();
                problemCollection1.reset(findLevel);

                var ProblemListView1 = new TRADE.ProblemListView ({collection: problemCollection1});
                ProblemListView1.render();
                $('#body_container').append(ProblemListView1.$el);

                $('#level_list').on('click', 'li', function () {
                    var level = $(this).data('level');
                    console.dir(level);
                    var newLevel = _.where(problems.list, {problemlevel:level});
                    console.dir(newLevel);
                    problemCollection1.reset(newLevel);
                });
                $('#classroom_list').on('click', 'li', function () {
                    var newid = $(this).data('classroomid');
                    console.log(newid);
                    var x = $(this).html();
                    $('#current_classroom').html(x);
                    $.get("/problems/" + newid , function(data, status){ //gets a list of problems for level

                        // $('#current_classroom').html();
                        var newLevel = _.where(data.list, {problemlevel:"Rookie"});
                        problemCollection1.reset(newLevel);
                    });
                });
            }
        }

        function renderTemplate () {
            var rtemplate = _.template(template);
            $('#body_container').prepend('<div id="problem_subnav" data-exists=true ></div>');
            $('#problem_subnav').append(rtemplate);
        }

    },

    problemSlideFunction: function (level, problemname, problemid) {

        var allSlides,
            wait = 0;

        $.get("/user", function(data, status){
            TRADE.UserData = data;
        });
         

        //clear html
        $('#body_container').html('');
        $('#lesson_container').html('');

        $.get('/slideTemplate/problem', function(data, status) {
            template = $(data).html();
            $("#lesson_container").append(_.template(template));
            $('#answer_container').data('level', level);
            $('#answer_container').data('problemname', problemname);
            $('#answer_container').data('problemid', problemid);
            wait ++;
            renderProblemSlide();
            
        });

        $.get('/problemslides/' + problemid, function(data, status){
            allSlides = data;
            wait ++;
            renderProblemSlide();
        });

        //loads outer slide template after json is complete
        function renderProblemSlide () {
            if (wait === 2) {
                $('#lesson_container').append('<div class="hidden">' + allSlides + '</div>');
                var slides = $('#slide_holder > .slide');
                TRADE.FUNC.problemIndexNav();
                var currentProblem = _.findWhere(TRADE.UserData.problemProgress, {problemid: problemid});
                if (currentProblem) {
                    var unlockedlength = currentProblem.unlocked.length;
                    for (var i = 0; i <= unlockedlength; i++) {
                        $("#slide_nav_" + i).addClass('unlocked');
                        if(i === unlockedlength) {
                            $("#slide_nav_" + i).addClass('problem-nav-active');
                            var problemTemplate = $(slides[i]).html();
                            TRADE.GameData.slideindex = i; //keeps track of current slide
                        }
                        // $("#slide_nav_0").addClass('problem-nav-active');
                    }
                } else {
                    $("#slide_nav_" + 0).addClass('problem-nav-active');
                    var problemTemplate = $(slides[0]).html();
                    TRADE.GameData.slideindex = 0; //keeps track of current slide
                }

                

                $("#slide_container").html(_.template(problemTemplate));

                

                //creates answer list view and render answer cards
                var answercollection1 = new TRADE.AnswerCollection ();
                answercollection1.reset(TRADE.GameData.answeroptions);
                var answerlistview1 = new TRADE.AnswerListView ({collection: answercollection1});
                answerlistview1.render();

                $("#slide_nav_0").addClass('unlocked');
                
                

                //append to dom
                $('#answer_categories').append(answerlistview1.$el);
                $('#answer_question').on('click', function () {
                    $('#answer_container').slideToggle(function(){
                        $('#answer_options').html('');
                        $('.bold').removeClass('bold');
                    });
                });
                $('#shadow').on('click', function () {
                    $(this).fadeToggle();
                    $('#correct').css('display', 'none');
                    $('#incorrect').css('display', 'none');
                });
            }
        }               
        
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

    // HVACChapterListView: function (classid) {

    //     $('.wrapper').html(''); //clear html
    //     $('#title_wrapper').html(''); //clear html

    //     $( document ).ready(function() {
    //         if(TRADE.NavObj == '') {
                
    //             $.get("/class/" + classid, function(data, status){ //get chapter info and render chapter cards
    //                 TRADE.NavObj = data;
    //                 console.dir(TRADE.NavObj);
    //                 TRADE.NavData.classid = classid; // manage with cookies
    //                 renderChapters();        
    //             });
    //         } else {
                
    //             renderChapters();
    //         }
            

    //     });
  
    //     function renderChapters () {
    //         //creates classroom title view and renders
    //         var class1 = new TRADE.ClassModel (TRADE.NavObj);
    //         var classview1 = new TRADE.ClassTitleView ({model: class1});
    //         classview1.render();
            
    //         //creates chapter list view and render chapter cards
    //         var ChapterCollection1 = new TRADE.ChapterCollection ();
    //         ChapterCollection1.reset(TRADE.NavObj.chapters);
    //         var ChapterListView1 = new TRADE.ChapterListView ({collection: ChapterCollection1});
    //         ChapterListView1.render();

    //         //append to dom
    //         $('.wrapper').append(ChapterListView1.$el);
    //         $('#title_wrapper').append(classview1.$el);
    //     }


    // },

    //     chapterFunction: function (chapterid) {

    //     //clear html
    //     $('#main_wrapper').html('');
    //     $('#title_wrapper').html('');
    //     TRADE.NavData.chapterid = chapterid;

    //     $( document ).ready(function() {
    //         $('#main_wrapper').append("<div id='lesson_list_container'></div>");

    //         if(TRADE.NavObj == '') {
    //             $.get("/getNav/reset", function(data, status){ //get chapter info and render chapter cards
    //                 TRADE.NavObj = data;
    //                 renderLessons();      
    //             });
    //         } else {
    //             renderLessons();
    //         }
    //         if(TRADE.UserData == ''){
    //             $.get("/session/classid", function(data, status){
    //                 TRADE.NavData.classid = data;
                                       
    //                 (function () {
    //                     $.get("/user", function(data, status){ //get user info and render user card

    //                         TRADE.UserData = data;
    //                         renderUserLesson();
    //                      });   
    //                 })();

    //             });

                          
    //         } else {
    //             renderUserLesson();
    //         }
    //     });

    //     function renderLessons () {
    //         //uses TRADE.NavData to find chapter -- uses TRADE.UserData to find user progress for chapter
    //         var record = _.findWhere(TRADE.NavObj.chapters, {chapterid: chapterid});

    //         //creates chapter title view and renders
    //         var chaptertitle1 = new TRADE.ChapterModel (record);
    //         var chaptertitleview1 = new TRADE.ChapterTitleView ({model: chaptertitle1});
    //         chaptertitleview1.render();
            
    //         //creates lesson list view and renders
    //         var LessonCollection1 = new TRADE.LessonCollection ();
    //         LessonCollection1.reset(record.lessons); //loads collection with lessons from chapter
    //         var LessonListView1 = new TRADE.LessonListView ({collection: LessonCollection1});
    //         LessonListView1.render();

    //         //append to dom
            
    //         $('#lesson_list_container').append(LessonListView1.$el);
    //         $('#title_wrapper').append(chaptertitleview1.$el);
    //     }

    //     function renderUserLesson () {
    //         console.log(chapterid);
    //         // var userrecord = _.findWhere(TRADE.UserData.progress, {chapterid: chapterid});
    //         // console.dir(userrecord);
    //         //creates chapter title view and renders
    //         var userchapter1 = new TRADE.User (TRADE.UserData);
    //         var userchapterview1 = new TRADE.UserChapterView ({model: userchapter1});
    //         userchapterview1.render();
    //         $('#lesson_list_container').append(userchapterview1.$el);
    //     }
        

    // },

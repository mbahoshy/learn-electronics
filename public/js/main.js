var TRADE = window.TRADE = {};

TRADE.UserData = ''; //holds an object containing data about the user

TRADE.NavObj= ''; //holds an object containing data about the navigation

TRADE.NavData = (function(){
	this.classid='';
	this.chapterid='';
	this.lessonid='';

	return this;
})();

TRADE.GameData = {
	gamejson:'',
	answeroptions:'',
	answer:'',
	slideindex:''
};

TRADE.FUNC = (function () {
	this.slideChange = function (chapterid, lessonid, that) {
			var slides = $('#slide_holder > .slide'); // get slide array
			var slidesNumber = (slides.length - 1); // get number of slides
			var direction = $(that).data('direction'); // get the direction to move the slide

			if (direction === 'left' && TRADE.GameData.slideindex !== 0) {
				$('.slide-active').removeClass('slide-active');
				$('#level_container').html('');
				TRADE.GameData.slideindex --; // decrease index by one
				$('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
				console.log('slide-index' + TRADE.GameData.slideindex);
				var template = $(slides[TRADE.GameData.slideindex]).html();
				$("#slide_container").html(_.template(template));
			}
			
			if (direction === 'right' && TRADE.GameData.slideindex === slidesNumber) {
				
                
                TRADE.router.navigate('#', {trigger: true});
			}


			if (direction === 'right' && TRADE.GameData.slideindex !== slidesNumber) {
				$('#level_container').html('');
				$('.slide-active').removeClass('slide-active')
				TRADE.GameData.slideindex ++;
				if (TRADE.GameData.slideindex === slidesNumber) {
					var date = new Date().getTime();
					$.post('/user/' + chapterid + '/' + lessonid + '/' + date, function(data){
	                    console.log('User updated successfully');
	                });
				}
				$('#slide_nav_' + TRADE.GameData.slideindex).addClass('slide-active');
				console.log('slide-index' + TRADE.GameData.slideindex);
				var template = $(slides[TRADE.GameData.slideindex]).html();
				$("#slide_container").html(_.template(template));
			}
			
		}

		this.slideIndexNav = function () {
			var slidesNumber = $('#slide_holder > .slide').length;
			for (var i=0; i<slidesNumber; i++) {
				$('#slide_index').append('<span id="slide_nav_' + i + '">' + (i + 1) + ' </span>');

			}
		}

		this.problemIndexNav = function () {
			var slides = $('#slide_holder > .slide'); // get slide array
			var slidesNumber = slides.length;
			for (var i=0; i<slidesNumber; i++) {
				$('#slide_index').append('<span class="problem-index" data-nav="' + i + '" id="slide_nav_' + i + '">' + (i + 1) + ' </span>');
			}
			$('#slide_index').on('click', '.unlocked', function () {
				var nav = $(this).data('nav');
				$('.problem-nav-active').removeClass('problem-nav-active');
				$("#level_container").html('');
				TRADE.GameData.slideindex = nav;
				$("#slide_nav_" + TRADE.GameData.slideindex).addClass('problem-nav-active');
				var template = $(slides[nav]).html();
				$("#slide_container").html(_.template(template));
			});
		}

		return this;

})();
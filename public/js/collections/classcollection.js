TRADE.ClassCollection = Backbone.Collection.extend({
	model: TRADE.ClassModel,
	url: ""
});

TRADE.ChapterCollection = Backbone.Collection.extend({
	model: TRADE.ChapterModel,
	url: ""
});

TRADE.AnswerCollection = Backbone.Collection.extend({
	model: TRADE.AnswerModel,
	url: ""
});

TRADE.LessonCollection = Backbone.Collection.extend({
	model: TRADE.Lesson,
	url: ""
});

TRADE.ProblemCollection = Backbone.Collection.extend({
	model: TRADE.Problem,
	url: ""
});

TRADE.QuestionCollection = Backbone.Collection.extend({
	model: TRADE.Question,
	url: ""
});
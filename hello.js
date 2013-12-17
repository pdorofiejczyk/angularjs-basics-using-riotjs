var Hello = function() {
	var self = this,
		data = {}

	self.setName = function(name) {
		data.yourName = name;
		self.trigger('changed', data);
	}

	self.appendName = function(text) {
		self.setName(data.yourName + text);
	}

	self.get = function() {
		return data;
	}

	$.observable(self);
}

$(function() {
	/* Init */
	var model = new Hello(),
		input = $('#hello'),
		container = $('#helloContainer'),
		template = container.html();

	/* User events */
	input.keypress(function(e) {
		var char = String.fromCharCode(e.which);
		model.appendName(char);
	});

	/* Model events */
	model.on("changed", function(data) {
		container.html($.render(template, data));
	});

	model.setName("");
});
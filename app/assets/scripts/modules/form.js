import $ from 'jquery';

class Form {
	constructor() {
		this.form = $(".contact-us__form");
		this.fields = this.form.find("input:not(:submit), textarea");
		this.messageBox = $(".form-message");
		this.events();
	} //constructor()

	 events() {
	 	this.fields.on('blur', this.checkFields);
	 	this.form.on('submit', this.checkForm.bind(this));
	} //events()

	checkFields() {
		var field = $(this),
			empty = ($.trim(field.val()) === "");

		field.toggleClass('field-invalid', empty);
	} //checkFields()

	checkForm(event) {

		event.preventDefault();

		var hasErrors = false,
			message = "";

		this.fields.each(function (i, elem) {
			var field = $(elem),
				empty = ($.trim(field.val()) === "");

			field.toggleClass('field-invalid', empty);
			if (empty) {
				hasErrors = true;
			}
		}); //each()

		if (hasErrors) {
			message = "You must fill in all of the fields.";
				this.messageBox.text(message).addClass('form-message--error');
		} else {
			var formData = this.form.serialize(),
				that = this;
			$.ajax({
				type: 'POST',
				url: that.form.attr('action'),
				data: formData
			}).done(function(response) {
				that.messageBox.removeClass('form-message--error');
				that.messageBox.text(response).addClass('form-message--success');
				that.fields.each(function (i, elem) {
					var field = $(elem);
					field.val('');
				}); //each()
			}).fail(function(data) {
			    that.messageBox.removeClass('form-message--success');
			    that.messageBox.addClass('form-message--error');
			    if (data.responseText !== '') {
			        that.messageBox.text(data.responseText);
			    } else {
			        that.messageBox.text('There was a problem with your submission. Please complete the form and try again.');
			    }
			});
		} //if()
	} // checkForm()
} // Form

export default Form;

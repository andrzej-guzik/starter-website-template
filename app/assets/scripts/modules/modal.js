import $ from 'jquery';

class Modal {
	constructor() {
		this.modal = $('.modal');
		this.openBtn = $('.modal__open');
		this.closeBtn = $('.modal__close');
		this.events();
	}

	events() {
		this.openBtn.on('click', this.openModal.bind(this));
		this.closeBtn.on('click', this.closeModal.bind(this));
		$(document).on('keyup', this.keyPressClose.bind(this));
	}

	openModal() {
		this.modal.addClass('modal--visible');
	}

	closeModal() {
		this.modal.removeClass('modal--visible');
	}

	keyPressClose(event) {
		if (event.which == 27) {
			this.closeModal();
		}
	}
}

export default Modal;

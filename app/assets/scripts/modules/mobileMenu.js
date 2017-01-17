import $ from 'jquery';

class MobileMenu {
	constructor() {
		this.menuIcon = $(".primary-header__menu-icon");
		this.mainNav = $(".main-nav");
		this.logo = $(".primary-header__logo");
		this.events();
	}

	events() {
		this.menuIcon.on('click', this.toggleMenu.bind(this));
	}

	toggleMenu() {
		this.mainNav.toggleClass("main-nav--is-expanded");
		this.menuIcon.toggleClass("primary-header__menu-icon--close");
		this.logo.toggleClass("primary-header__logo--center");
	}
}

export default MobileMenu;
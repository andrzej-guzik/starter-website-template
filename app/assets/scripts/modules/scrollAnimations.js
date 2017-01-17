import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class ScrollAnimations {
	constructor() {
		this.animateItems = $(".animate");
		this.hideItems();
		this.createWaypoints();
	}

	hideItems() {
		this.animateItems.addClass("animate-item");
	}

	createWaypoints() {
		this.animateItems.each(function() {
			var currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function() {
					$(currentItem).addClass("animate-item--is-visible");
				},
				offset: "75%"
			});
		});
	}
}

export default ScrollAnimations;
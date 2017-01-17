import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.primaryHeader = $(".primary-header");
		this.headerTrigger = $("#what-we-do");
		this.mainNavLinks = $(".main-nav a");
		this.createHeaderWaypoint();
		this.pageSections = $(".page-section, .large-hero");
		this.createSectionsWaypoints();
		this.addSmothScrolling();
	}

	addSmothScrolling() {
		this.mainNavLinks.smoothScroll({offset: -64});
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({			
			element: this.headerTrigger[0],
			handler: function(direction) {
				if (direction == "down") {
					that.primaryHeader.addClass("primary-header--dark");
					that.mainNavLinks.addClass("light");
				} else {
					that.primaryHeader.removeClass("primary-header--dark");
					that.mainNavLinks.removeClass("light");
				}
			},
			offset: "10%"
		});
	}

	createSectionsWaypoints() {
		var that = this;
		this.pageSections.each(function() {
			var currentSection = this;
			new Waypoint({
				element: currentSection,
				handler: function(direction) {
					if (direction == "down") {
						var matchingLink = currentSection.getAttribute("data-link");	
						that.mainNavLinks.removeClass('is-active');
						$(matchingLink).addClass("is-active");			
					}									
				},
				offset: "15%"				
			});
			new Waypoint({
				element: currentSection,
				handler: function(direction) {
					if (direction == "up") {
						var matchingLink = currentSection.getAttribute("data-link");	
						that.mainNavLinks.removeClass('is-active');
						$(matchingLink).addClass("is-active");	
					}						
				},
				offset: "-64"				
			});
		});
	}
}

export default StickyHeader;
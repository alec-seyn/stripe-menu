window.onload = function () 
{
	var morphDropdowns = [];
    if ($('.stripe-style-menu').length > 0) 
	{
        $('.stripe-style-menu').each(function() 
		{
            morphDropdowns.push(new morphDropdown($(this)));
        });
		
        var resizing = false;
		
        updateDropdownPosition();
        $(window).on('resize', function() {
            if (!resizing) {
                resizing = true;
                (!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
            }
        });
        function updateDropdownPosition() {
            morphDropdowns.forEach(function(element) {
                element.resetDropdown();
            });
            resizing = false;
        }
        ;
    }
}

function morphDropdown(element) 
{	
	this.element = element;
	this.mainNavigation = this.element.find('.navbar');
	this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
	this.dropdownList = this.element.find('.dropdown-list');
	this.dropdownArrow = this.element.find('.dropdown-arrow');
	this.bindEvents();
}

morphDropdown.prototype.bindEvents = function() 
{
   var self = this;
	
   this.mainNavigationItems
	.mouseenter( function(event){
      // hover over one of the nav items -> show dropdown
      self.showDropdown($(this));})
	.mouseleave(function(){
		setTimeout(function() {
			// if not hovering over a nav item or a dropdown -> hide dropdown
			if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown:hover').length == 0 ) self.hideDropdown();
		}, 100);
	});
	
	this.dropdownList.mouseleave(function(){
		setTimeout(function() {
			// if not hovering over a nav item or a dropdown -> hide dropdown
			if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown:hover').length == 0 ) self.hideDropdown();
		}, 100);
	});
};

morphDropdown.prototype.showDropdown = function(item) 
{
	var self = this;
	
	var selectedDropdown = this.dropdownList.find('#'+item.data('content'));
	var selectedDropdownHeight = selectedDropdown.innerHeight();
	var selectedDropdownWidth = selectedDropdown.innerWidth();
	var selectedDropdownLeft = item.offset().left - this.mainNavigation.offset().left + item.innerWidth()/2 - selectedDropdownWidth/2;
	
	// update dropdown and dropdown background position and size
	this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
   
	// add the active class to the selected dropdown
	this.element.find('.active').removeClass('active');
	this.dropdownArrow.addClass('active');
	selectedDropdown.addClass('active');
   	
	// add .dropdown-visible to the .stripe-style-menu
	if (!this.element.hasClass('dropdown-visible')) 
	{
		setTimeout(function() {
			self.element.addClass('dropdown-visible');
		}, 10);
	}
};

morphDropdown.prototype.updateDropdown = function(dropdownItem, height, width, left) 
{
	// move dropdown
	this.dropdownList.css({
		'-moz-transform': 'translateX(' + left + 'px)',
		'-webkit-transform': 'translateX(' + left + 'px)',
		'-ms-transform': 'translateX(' + left + 'px)',
		'-o-transform': 'translateX(' + left + 'px)',
		'transform': 'translateX(' + left + 'px)',
		'width': width+'px',
		'height': height+'px'
	});

	// move arrow of dropdown
	var leftArrow = parseInt(left + width/2 - $(this.dropdownArrow).innerWidth()/2);
	this.dropdownArrow.css({
		'-moz-transform': 'translateX(' + leftArrow + 'px) rotate(45deg)',
		'-webkit-transform': 'translateX(' + leftArrow + 'px) rotate(45deg)',
		'-ms-transform': 'translateX(' + leftArrow + 'px) rotate(45deg)',
		'-o-transform': 'translateX(' + leftArrow + 'px) rotate(45deg)',
		'transform': 'translateX(' + leftArrow + 'px) rotate(45deg)'
   });
};

morphDropdown.prototype.hideDropdown = function() 
{
	this.element.removeClass('dropdown-visible').find('.active').removeClass('active');	
};

morphDropdown.prototype.resetDropdown = function() 
{
	this.dropdownList.removeAttr('style');
};



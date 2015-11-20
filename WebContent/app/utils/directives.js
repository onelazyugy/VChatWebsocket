// Since we do not have too many directives,
// one "directives.js" file will have to suffice

directives.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

directives.directive('hoverClass', function () {
    return {
        restrict: 'A',
        scope: {
            hoverClass: '@'
        },
        link: function (scope, element) {
            element.on('mouseenter', function() {
                element.addClass(scope.hoverClass);
            });
            element.on('mouseleave', function() {
                element.removeClass(scope.hoverClass);
            });
        }
    };
});

//check boxes
directives.directive('checkboxAll', function () {
	  return function(scope, iElement, iAttrs) {
		var parts = iAttrs.checkboxAll.split('.');
		iElement.attr('type', 'checkbox');
		iElement.bind('change', function(evt) {
			scope.$apply(function() {
				var setValue = iElement.prop('checked');
				angular.forEach(scope.$eval(parts[0]), function(v) {
					v[parts[1]] = setValue;
				});
			});
		});
		scope.$watch(parts[0], function(newVal) {
			var hasTrue, hasFalse;
			angular.forEach(newVal, function(v) {
				if (v[parts[1]]) {
					hasTrue = true;
				} else {
					hasFalse = true;
				}
			});
			if (hasTrue && hasFalse) {
				iElement.attr('checked', false);
				iElement.addClass('greyed');
			} else {
				iElement.attr('checked', hasTrue);
				iElement.removeClass('greyed');
			}
		}, true);
	};
});

//print an id selector
directives.directive('ngPrint', function () {
	var printSection = document.getElementById('printSection');

	// if there is no printing section, create one
	if (!printSection) {
	    printSection = document.createElement('div');
	    printSection.id = 'printSection';
	    document.body.appendChild(printSection);
	}

	function link(scope, element, attrs) {
	    element.on('click', function () {
	        var elemToPrint = document.getElementById(attrs.printElementId);
	        if (elemToPrint) {
	            window.print();
	        }
	    });

	    window.onafterprint = function () {
	        // clean the print section before adding new content
	        printSection.innerHTML = '';
	    };
	}

	return {
	    link: link,
	    restrict: 'A'
	};
});

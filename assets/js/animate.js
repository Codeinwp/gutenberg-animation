const animation = [
	'none',
	'bounce',
	'flash',
	'pulse',
	'rubberBand',
	'shake',
	'headShake',
	'swing',
	'tada',
	'wobble',
	'jello',
	'bounceIn',
	'bounceInDown',
	'bounceInLeft',
	'bounceInRight',
	'bounceInUp',
	'bounceOut',
	'bounceOutDown',
	'bounceOutLeft',
	'bounceOutRight',
	'bounceOutUp',
	'fadeIn',
	'fadeInDown',
	'fadeInDownBig',
	'fadeInLeft',
	'fadeInLeftBig',
	'fadeInRight',
	'fadeInRightBig',
	'fadeInUp',
	'fadeInUpBig',
	'fadeOut',
	'fadeOutDown',
	'fadeOutDownBig',
	'fadeOutLeft',
	'fadeOutLeftBig',
	'fadeOutRight',
	'fadeOutRightBig',
	'fadeOutUp',
	'fadeOutUpBig',
	'flipInX',
	'flipInY',
	'flipOutX',
	'flipOutY',
	'lightSpeedIn',
	'lightSpeedOut',
	'rotateIn',
	'rotateInDownLeft',
	'rotateInDownRight',
	'rotateInUpLeft',
	'rotateInUpRight',
	'rotateOut',
	'rotateOutDownLeft',
	'rotateOutDownRight',
	'rotateOutUpLeft',
	'rotateOutUpRight',
	'hinge',
	'jackInTheBox',
	'rollIn',
	'rollOut',
	'zoomIn',
	'zoomInDown',
	'zoomInLeft',
	'zoomInRight',
	'zoomInUp',
	'zoomOut',
	'zoomOutDown',
	'zoomOutLeft',
	'zoomOutRight',
	'zoomOutUp',
	'slideInDown',
	'slideInLeft',
	'slideInRight',
	'slideInUp',
	'slideOutDown',
	'slideOutLeft',
	'slideOutRight',
	'slideOutUp',
	'heartBeat'
];

const delay = [
	'none',
	'delay-2s',
	'delay-3s',
	'delay-4s',
	'delay-5s'
];

const speed = [
	'none',
	'slow',
	'slower',
	'fast',
	'faster'
];


window.onload = () => {
	const elements = document.querySelectorAll( '.animated' );
	for ( const element of elements ) {
		classes = element.classList;
		element.animationClasses = [];

		if ( ! isElementInViewport( element ) ) {
			const animationClass = animation.find( i => {
				return Array.from( classes ).find( o => o === i );
			});

			const delayClass = delay.find( i => {
				return Array.from( classes ).find( o => o === i );
			});

			const speedClass = speed.find( i => {
				return Array.from( classes ).find( o => o === i );
			});

			element.classList.add( 'hidden-animated' );

			if ( animationClass ) {
				element.animationClasses.push( animationClass );
				element.classList.remove( animationClass );
			}

			if ( delayClass ) {
				element.animationClasses.push( delayClass );
				element.classList.remove( delayClass );
			}

			if ( speedClass ) {
				element.animationClasses.push( speedClass );
				element.classList.remove( speedClass );
			}
		}
	}

	window.onscroll = () => {
		for ( const element of elements ) {
			if ( element.getBoundingClientRect().top <= window.innerHeight * 0.75 && 0 < element.getBoundingClientRect().top ) {
				if ( element.animationClasses && 0 < element.animationClasses.length ) {
					const classes = element.animationClasses;
					classes.forEach( i => element.classList.add( i ) );
					element.classList.remove( 'hidden-animated' );
					delete element.animationClasses;
				}
			}
		}
	};
};

const isElementInViewport = el => {
	const scroll = window.scrollY || window.pageYOffset;
	const boundsTop = el.getBoundingClientRect().top + scroll;

	const viewport = {
		top: scroll,
		bottom: scroll + window.innerHeight
	};

	const bounds = {
		top: boundsTop,
		bottom: boundsTop + el.clientHeight
	};

	return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom ) || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
};

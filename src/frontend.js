import { updateHTMLClassListAnimVersion } from './utility';

const animations = [
	'none',
	'bounce',
	'flash',
	'pulse',
	'rubberBand',
	'shakeX',
	'shakeY',
	'headShake',
	'swing',
	'tada',
	'wobble',
	'jello',
	'heartBeat',
	'hinge',
	'jackInTheBox',
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
	'backOutDown',
	'backOutLeft',
	'backOutRight',
	'backOutUp',
	'fadeIn',
	'fadeInDown',
	'fadeInDownBig',
	'fadeInLeft',
	'fadeInLeftBig',
	'fadeInRight',
	'fadeInRightBig',
	'fadeInUp',
	'fadeOut',
	'fadeOutDown',
	'fadeOutDownBig',
	'fadeOutLeft',
	'fadeOutLeftBig',
	'fadeOutRight',
	'fadeOutRightBig',
	'fadeOutUp',
	'fadeOutUpBig',
	'fadeInTopLeft',
	'fadeInTopRight',
	'fadeInBottomLeft',
	'fadeInBottomRight',
	'fadeOutTopLeft',
	'fadeOutTopRight',
	'fadeOutBottomRight',
	'fadeOutBottomLeft',
	'flip',
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
	'slideInDown',
	'slideInLeft',
	'slideInRight',
	'slideInUp',
	'slideOutDown',
	'slideOutLeft',
	'slideOutRight',
	'slideOutUp',
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
	'rollIn',
	'rollOut',
	'lightSpeedInRight',
	'lightSpeedInLeft',
	'lightSpeedOutRight',
	'lightSpeedOutLeft'
].map( anim => 'animate__' + anim );

// const outAnimation = [
// 	'bounceOut',
// 	'bounceOutDown',
// 	'bounceOutLeft',
// 	'bounceOutRight',
// 	'bounceOutUp',
// 	'fadeOut',
// 	'fadeOutDown',
// 	'fadeOutDownBig',
// 	'fadeOutLeft',
// 	'fadeOutLeftBig',
// 	'fadeOutRight',
// 	'fadeOutRightBig',
// 	'fadeOutUp',
// 	'fadeOutUpBig',
// 	'flipOutX',
// 	'flipOutY',
// 	'lightSpeedOut',
// 	'rotateOut',
// 	'rotateOutDownLeft',
// 	'rotateOutDownRight',
// 	'rotateOutUpLeft',
// 	'rotateOutUpRight',
// 	'slideOutDown',
// 	'slideOutLeft',
// 	'slideOutRight',
// 	'slideOutUp',
// 	'zoomOut',
// 	'zoomOutDown',
// 	'zoomOutLeft',
// 	'zoomOutRight',
// 	'zoomOutUp',
// 	'rollOut'
// ].map( anim => 'animate__' + anim );

const delay = [
	'none',
	'delay-100ms',
	'delay-200ms',
	'delay-500ms',
	'delay-1s',
	'delay-2s',
	'delay-3s',
	'delay-4s',
	'delay-5s'
].map( anim => 'animate__' + anim );

const speed = [
	'none',
	'slow',
	'slower',
	'fast',
	'faster'
].map( anim => 'animate__' + anim );

window.onload = () => {
	const elements = [ ...document.querySelectorAll( '.animate__animated' ), ...document.querySelectorAll( '.animated' ) ];
	console.log( elements );
	for ( const element of elements ) {
		updateHTMLClassListAnimVersion( element.classList );
		const elementCSSClasses = Array.from( element.classList );
		element.animationClasses = [];

		if ( ! isElementInViewport( element ) ) {
			const animationClass = animations.find( anim => {
				return elementCSSClasses.find( cssClass => cssClass === anim );
			});

			const delayClass = delay.find( delay => {
				return elementCSSClasses.find( cssClass => cssClass === delay );
			});

			const speedClass = speed.find( speed => {
				return elementCSSClasses.find( cssClass => cssClass === speed );
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

			element.classList.remove( 'animate__animated' );
			element.animationClasses.push( 'animate__animated' );
		}

		// outAnimation.forEach( i => {
		// 	const isOut = element.classList.contains( i );

		// 	if ( isOut ) {
		// 		element.addEventListener( 'animationend', () => {
		// 			element.classList.remove( i );
		// 		});
		// 	}
		// });
	}

	window.onscroll = () => {
		for ( const element of elements ) {
			if ( element.getBoundingClientRect().top <= window.innerHeight * 0.75 && 0 < element.getBoundingClientRect().top ) {
				if ( element.animationClasses && 0 < element.animationClasses.length ) {
					const classes = element.animationClasses;
					classes.forEach( animClass => element.classList.add( animClass ) );
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

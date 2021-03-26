/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { SelectControl } = wp.components;

const {
	Fragment,
	useState,
	useEffect
} = wp.element;

/**
 * Internal dependencies.
 */
import {
	animationsList,
	delayList,
	speedList,
	outAnimation
} from './data.js';

import AnimationPopover from './components/animation-popover';

function AnimationControls({
	attributes,
	clientId,
	setAttributes
}) {
	useEffect( () => {

		/**
		 * Extract the animation type, delay, and speed from the block className property
		 */
		if ( attributes.className ) {
			const blockClasses = attributes.className.split( ' ' );

			const animationClass = animationsList.find( ({value}) => {
				return blockClasses.includes( value );
			});

			const delayClass = delayList.find( ({value}) => {
				return blockClasses.includes( value );
			});

			const speedClass = speedList.find( ({value}) => {
				return blockClasses.includes( value );
			});

			setAnimation( animationClass ? animationClass.value : 'none' );
			setDelay( delayClass ? delayClass.value : 'default' );
			setSpeed( speedClass ? speedClass.value : 'default' );
			setCurrentAnimationLabel( animationClass ? animationClass.label : 'none' );
		}
	}, []);

	useEffect ( ()=>{

		/**
		 * Save in local storage information about the most used animations.
		 */
		if ( ! localStorage.animationCounter ) {
			const animationCounter = animationsList.reduce( ( counter, { label }) => {
				counter[label] = 0;
				return counter;
			}, {});

			localStorage.setItem( 'animationCounter', JSON.stringify( animationCounter ) );

		} else {
			let newAnimationCounter = JSON.parse( localStorage.getItem( 'animationCounter' ) );
			updateMostUsedAnimations( newAnimationCounter );
		}
	}, []);

	const [ animation, setAnimation ] = useState( 'none' );
	const [ delay, setDelay ] = useState( 'default' );
	const [ speed, setSpeed ] = useState( 'default' );
	const [ currentAnimationLabel, setCurrentAnimationLabel ] = useState( 'none' );
	const [ mostUsedAnimations, setMostUsedAnimations ] = useState( null );

	const updateMostUsedAnimations = animations =>{
		let sortedAnimations = Object.keys( animations ).sort( ( a, b ) => {
			return animations[b] - animations[a];
		});
		console.log( 'Sorted', sortedAnimations );
		const mostUsed = sortedAnimations.filter( anim => 'None' !== anim && 0 < animations[anim]).slice( 0, 5 );
		console.log( 'Most Used', mostUsed );
		setMostUsedAnimations( mostUsed );
	};

	const updateAnimation = ( label, value ) => {
		let newAnimationCounter = JSON.parse( localStorage.getItem( 'animationCounter' ) );
		newAnimationCounter[label]++;
		localStorage.animationCounter = JSON.stringify( newAnimationCounter );
		updateMostUsedAnimations( newAnimationCounter );

		const animationCSSClass =  value || animationsList.find( animation =>{
			return animation.label === label;
		}).value;

		let cssClassesList = [];

		if ( attributes.className ) {

			// get the current classes and remove the old animation
			cssClassesList = attributes.className.split( ' ' ).filter( cssClass => cssClass !== animation );
		}

		if ( 'none' === animationCSSClass ) {

			// remove the animation attributes
			cssClassesList = cssClassesList.filter( cssClass => 'animate__animated' !== cssClass || delay !== cssClass || speed !== cssClass );
			setDelay( 'default' );
			setSpeed( 'default' );
		} else {

			// add the animation attributes if it is the case
			if ( ! cssClassesList.includes( 'animate__animated' ) ) {
				cssClassesList.push( 'animate__animated' );
			}

			if ( ! cssClassesList.includes( animationCSSClass ) ) {
				cssClassesList.push( animationCSSClass );
			}
		}

		const newCssClassName = cssClassesList.length ? cssClassesList.join( ' ' ) : undefined;
		console.log( 'animationCSSClass', animationCSSClass );
		console.log( 'Anim Class List', cssClassesList );
		console.log( 'New CSS Class Name', newCssClassName );

		setAnimation( animationCSSClass );
		setAttributes({ className: newCssClassName });

		const block = document.querySelector( `#block-${ clientId } .animate__animated` );

		if ( block ) {
			outAnimation.forEach( anim => {
				const isOut =  Array.from( block.classList ).includes( anim );

				if ( isOut ) {
					block.addEventListener( 'animationend', () => {
						block.classList.remove( anim );

						block.addEventListener( 'animationstart', () => {
							block.classList.remove( anim );
						});
					});
				}
			});
		}
	};

	const updateDelay = delayValue => {
		const cssClassesList = attributes.className ? attributes.className.split( ' ' ).filter( cssClass => cssClass !== delay ) : [];

		if ( 'none' !== delayValue ) {
			cssClassesList.push( delayValue );
		}

		setDelay( delayList );
		setAttributes({ className: cssClassesList.join( ' ' ) });
	};

	const updateSpeed = speedValue  => {
		const cssClassesList = attributes.className ? attributes.className.split( ' ' ).filter( cssClass => cssClass !== speed ) : [];

		if ( 'none' !== speedValue ) {
			cssClassesList.push( speedValue );
		}

		setSpeed( speedValue );
		setAttributes({ className: cssClassesList.join( ' ' ) });
	};

	return (
		<div className="themeisle-animations-control">
			<AnimationPopover
				animationsList={ animationsList }
				updateAnimation={ updateAnimation }
				currentAnimationLabel={ currentAnimationLabel }
				setCurrentAnimationLabel={ setCurrentAnimationLabel }
				mostUsedAnimations={ mostUsedAnimations }
			/>
			{
				'none' !== animation && (
					<Fragment>
						<SelectControl
							label={ __( 'Delay' ) }
							value={ delay || 'default' }
							options={ delayList }
							onChange={ updateDelay }
						/>

						<SelectControl
							label={ __( 'Speed' ) }
							value={ speed || 'default' }
							options={ speedList }
							onChange={ updateSpeed }
						/>
					</Fragment>
				)
			}
		</div >
	);
}

export default AnimationControls;

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
		let classes;

		if ( attributes.className ) {
			classes = attributes.className;
			classes = classes.split( ' ' );

			const animationClass = Array.from( animationsList ).find( i => {
				return classes.find( o => o === i.value );
			});

			const delayClass = Array.from( delayList ).find( i => {
				return classes.find( o => o === i.value );
			});

			const speedClass = Array.from( speedList ).find( i => {
				return classes.find( o => o === i.value );
			});

			setAnimation( animationClass ? animationClass.value : 'none' );
			setDelay( delayClass ? delayClass.value : 'default' );
			setSpeed( speedClass ? speedClass.value : 'default' );
			setCurrentAnimationLabel( animationClass ? animationClass.label : 'none' );
		}
	}, []);

	useEffect ( ()=>{
		let animationCounter = {};

		if ( ! localStorage.animationCounter ) {
			animationsList.map ( animation => {
				animationCounter[animation.label] = 0;
			});
			localStorage.setItem( 'animationCounter', JSON.stringify( animationCounter ) );

		} else {
			let newAnimationCounter = JSON.parse( localStorage.getItem( 'animationCounter' ) );
			getMostUsedAnimations( newAnimationCounter );
		}
	}, []);

	const [ animation, setAnimation ] = useState( 'none' );
	const [ delay, setDelay ] = useState( 'default' );
	const [ speed, setSpeed ] = useState( 'default' );
	const [ currentAnimationLabel, setCurrentAnimationLabel ] = useState( 'none' );
	const [ mostUsedAnimations, setMostUsedAnimations ] = useState( null );

	const getMostUsedAnimations = animations =>{
		let sortedAnimations = Object.keys( animations ).sort( ( a, b ) => {
			return animations[b] - animations[a];
		});
		let mostUsed = [];
		let animationIndex = 0;
		for ( let index = 0; 5 > index; index++ ) {
			if ( 'None' !== sortedAnimations[index] && 0 !== animations[sortedAnimations[index]]) {
				mostUsed[animationIndex++] = sortedAnimations[index];
			}
		}
		setMostUsedAnimations( mostUsed );
	};

	const updateAnimation = ( value, label ) => {
		let newAnimationCounter = JSON.parse( localStorage.getItem( 'animationCounter' ) );
		if ( ! value ) {
			value = animationsList.filter( animation =>{
				return animation.label === label;
			});
			value = value[0].value;
		}

		newAnimationCounter[label]++;
		localStorage.animationCounter = JSON.stringify( newAnimationCounter );
		getMostUsedAnimations( newAnimationCounter );

		let classes;

		let animationValue = 'none' !== value ? value : '';

		if ( attributes.className ) {
			classes = attributes.className;
			classes = classes.split( ' ' );
			const exists = classes.find( i => i === animation );
			const animatedExists = classes.find( i => 'animated' === i );

			if ( ! animatedExists ) {
				classes.push( 'animated' );
			}

			if ( exists ) {
				classes = classes.join( ' ' ).replace( animation, animationValue );
			} else {
				classes.push( animationValue );
				classes = classes.join( ' ' );
			}
		} else {
			classes = `animated ${ animationValue }`;
		}

		if ( 'none' === value ) {
			classes = classes.replace( 'animated', '' ).replace( delay, '' ).replace( speed, '' );

			setDelay( 'default' );
			setSpeed( 'default' );
		}

		classes = classes.replace( /\s+/g, ' ' ).trim();

		if ( '' === classes ) {
			classes = undefined;
		}

		setAnimation( value );
		setAttributes({ className: classes });

		let block = document.querySelector( `#block-${ clientId } .animated` );

		if ( block ) {
			outAnimation.forEach( i => {
				const isOut = block.className.includes( i );

				if ( isOut ) {
					block.addEventListener( 'animationend', () => {
						block.classList.remove( i );

						block.addEventListener( 'animationstart', () => {
							block.classList.remove( i );
						});
					});
				}
			});
		}
	};

	const updateDelay = e => {
		let classes;
		let delayValue = 'none' !== e ? e : '';

		if ( attributes.className ) {
			classes = attributes.className;
			classes = classes.split( ' ' );
			const exists = classes.find( i => i === delay );

			if ( exists ) {
				classes = classes.join( ' ' ).replace( delay, delayValue );
			} else {
				classes.push( delayValue );
				classes = classes.join( ' ' );
			}
		} else {
			classes = delayValue;
		}

		classes = classes.replace( /\s+/g, ' ' );

		setDelay( e );
		setAttributes({ className: classes });
	};

	const updateSpeed =  e  => {
		let classes;
		let speedValue = 'none' !== e ? e : '';

		if ( attributes.className ) {
			classes = attributes.className;
			classes = classes.split( ' ' );
			const exists = classes.find( i => i === speed );

			if ( exists ) {
				classes = classes.join( ' ' ).replace( speed, speedValue );
			} else {
				classes.push( speedValue );
				classes = classes.join( ' ' );
			}
		} else {
			classes = speedValue;
		}

		classes = classes.replace( /\s+/g, ' ' );

		setSpeed( e );
		setAttributes({ className: classes });
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

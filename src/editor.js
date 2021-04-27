/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { SelectControl } = wp.components;

const {
	Fragment,
	useEffect,
	useReducer
} = wp.element;

/**
 * Internal dependencies.
 */
import {
	animationsList,
	delayList,
	speedList
} from './data.js';

import AnimationPopover from './components/animation-popover';
import { extractAnimationFrom, completRemoveAnimationFrom, incrementAnimUsage, filterMostUsedAnim, getAnimUsageFromStorage } from './utility.js';

const initialState = {
	animation: null,
	delay: null,
	speed: null,
	animationLabel: undefined,
	mostUsedAnimations: {},
	build: null,
	buildWasUsed: true,
	className: null
};

const actionType = {
	INIT: 'INIT',
	UPDATE: 'UPDATE',
	BUILD: 'BUILD',
	CONSUME_BUILD: 'CONSUME_BUILD',
	UPDATE_USAGE: 'UPDATE_USAGE',
	ADD_CLASSNAME: 'ADD_CLASSNAME'
};

const reducer = ( state, action ) => {
	console.log( action, state );
	switch ( action.type ) {

	/**
	* Extract the current settings from block's className
	*/
	case actionType.INIT:
		const blockClassList = action.className?.split( ' ' ) || [];
		const animation = extractAnimationFrom( blockClassList, 'animation' );
		console.log( 'INIT', blockClassList, animation, animationsList.find( ({ value }) => {
			return value === animation;
		}) );
		return {
			animation: animation,
			delay: extractAnimationFrom( blockClassList, 'delay' ),
			speed: extractAnimationFrom( blockClassList, 'speed' ),
			animationLabel: animationsList.find( ({ value }) => {
				return value === animation;
			})?.label || 'None'
		};

	/**
	 * Update one of the state's setting
	 */
	case actionType.UPDATE:
		if ( 'animation' === action.name ) {
			state.animationLabel = action.label;
		}
		state[action.name] = action.value;
		return {...state};

	/**
	 * Create the build's value based on the current state settings and the outside values of the className
	 */
	case actionType.BUILD:

		// remove the past animation values from the className
		const cleanedClassList = completRemoveAnimationFrom( state.className?.split( ' ' ) || []).filter( cssClass => cssClass );
		if ( state.animation && 'none' !== state.animation ) {
			cleanedClassList.push( 'animate__animated', state.animation );
			if (  state.delay && 'none' !== state.delay ) {
				cleanedClassList.push( state.delay );
			}
			if ( state.speed && 'none' !== state.speed ) {
				cleanedClassList.push( state.speed );
			}
		}

		return {
			...state,
			build: cleanedClassList.join( ' ' ),
			buildWasUsed: false
		};

	/**
	 * Reset the buid value to null, this indicate that the build's value has been send to the block.
	 */
	case actionType.CONSUME_BUILD:
		return {
			...state,
			buildWasUsed: true
		};

	/**
	 * Update the list with the most used animations based on the value from the storage
	 */
	case actionType.UPDATE_USAGE:
		return {
			...state,
			mostUsedAnimations: filterMostUsedAnim( getAnimUsageFromStorage() )
		};

	/**
	 * Add the value of the block's className to the current state
	 */
	case actionType.ADD_CLASSNAME:
		return {
			...state,
			className: action.className
		};
	};
};

function AnimationControls({
	attributes,
	clientId,
	name,
	setAttributes
}) {

	const [ animationSettings, dispatch ] = useReducer( reducer, initialState );

	/**
	 * Extract the animation type, delay, and speed from the block's className property on initialization
	 */
	useEffect( () => {
		dispatch({
			type: actionType.INIT,
			className: attributes.className
		});
	}, []);

	/**
	 * Notify the reducer to get informations about the most used animation.
	 * If none, initialize it.
	 */
	useEffect ( ()=>{
		if ( ! localStorage.themeisleAnimationUsage ) {
			const animationCounter = animationsList.reduce( ( counter, { label }) => {
				counter[label] = 0;
				return counter;
			}, {});

			localStorage.setItem( 'themeisleAnimationUsage', JSON.stringify( animationCounter ) );
		}
		dispatch({
			type: actionType.UPDATE_USAGE
		});
	}, []);

	/**
	 * Update the usage of the current animation.
	 * Notify the reducer to update the usage.
	 */
	useEffect( () => {
		if ( animationSettings.animation ) {
			incrementAnimUsage( animationSettings.animationLabel );
			dispatch({
				type: actionType.UPDATE_USAGE
			});
		}
	}, [ animationSettings.animation ]);

	/**
	 * Send the new value of the block's className when it is changed internally or externally.
	 * Also, attach an event listener to the HTML element to revemove the animation after it ends its effect.
	 * In this way, the element will remain in the page in case of the animation with out effect.
	 */
	useEffect( () => {
		const block = name.startsWith( 'core/' ) ? document.querySelector( `#block-${clientId}.animate__animated` ) : document.querySelector( `#block-${clientId} .animate__animated` );
		console.log( 'BLOCK', block );
		block?.addEventListener(
			'animationend',
			() => {
				block?.classList.remove( 'animate__animated',  animationSettings.animation, animationSettings.delay, animationSettings.speed );
			}
		);

		if ( animationSettings.className !== attributes.className ) {
			dispatch({
				type: actionType.ADD_CLASSNAME,
				className: attributes.className
			});
		};

	}, [ attributes.className, animationSettings.className ]);

	/**
	 * When one settings is changed, notify the reducer to create a new build.
	 */
	useEffect( () => {
		dispatch({
			type: actionType.BUILD
		});
	}, [ animationSettings.animation, animationSettings.delay, animationSettings.speed ]);

	/**
	 * After the build created, send it to the block as a new value for the className attribute.
	 * Prevent this if the build is `null` - it means that the value has been already send.
	 * Exception when the build is null AND the animation option is `none` meaning that
	 * in the className was no other values besides the ones specific to the animations
	 * and to the initial className was `null`.
	 */
	useEffect( () => {

		// console.log( animationSettings.build );
		if ( ! animationSettings.buildWasUsed ) {
			setAttributes({
				className: animationSettings.build
			});
			dispatch({
				type: actionType.CONSUME_BUILD
			});
		}
	}, [ animationSettings.build, animationSettings.buildWasUsed ]);

	/**
	 * Set the new animation for the block
	 * @param {string} label
	 * @param {string} value
	 */
	const updateAnimation = ( label, value ) => {
		dispatch({
			type: actionType.UPDATE,
			name: 'animation',
			label: label,
			value: value || animationsList.find( animation =>{
				return animation.label === label;
			}).value
		});
	};

	/**
	 * Set the new delay value
	 * @param {string} delayValue
	 */
	const updateDelay = delayValue => {
		dispatch({
			type: actionType.UPDATE,
			name: 'delay',
			value: delayValue
		});
	};

	/**
	 * Set the new speed value
	 * @param {string} speedValue
	 */
	const updateSpeed = speedValue  => {
		dispatch({
			type: actionType.UPDATE,
			name: 'speed',
			value: speedValue
		});
	};

	return (
		<div className="themeisle-animations-control">
			<AnimationPopover
				animationsList={ animationsList }
				updateAnimation={ updateAnimation }
				currentAnimationLabel={ animationSettings.animationLabel }
				mostUsedAnimations={ animationSettings.mostUsedAnimations }
			/>
			{
				'none' !== animationSettings.animation && animationSettings.animation && (
					<Fragment>
						<SelectControl
							label={ __( 'Delay' ) }
							value={ animationSettings.delay || 'none' }
							options={ delayList }
							onChange={ updateDelay }
						/>

						<SelectControl
							label={ __( 'Speed' ) }
							value={ animationSettings.speed || 'none' }
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

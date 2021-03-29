/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { SelectControl } = wp.components;

const {
	Fragment,
	useState,
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
import { extractAnimationFrom, removeAllAnimations, removeAnimationFrom, incrementAnimUsage, filterMostUsedAnim, getAnimUsageFromStorage } from './utility.js';

const initialState = {
	animation: null,
	delay: null,
	speed: null,
	animationLabel: undefined,
	mostUsedAnimations: {},
	build: null,
	className: null
};

const actionType = {
	INIT: 'INIT',
	UPDATE: 'UPDATE',
	BUILD: 'BUILD',
	CONSUME_BUILD: 'CONSUME_BUILD',
	UPDATE_USAGE: 'UPDATE_USAGE',
	ADD_CLASSNAME: 'ADD_CLASSNAME',
	CLEAR_ON_END: 'CLEAR_ON_END'
};

const reducer = ( state, action ) => {
	console.log( action, state );
	switch ( action.type ) {
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
	case actionType.UPDATE:
		if ( 'animation' === action.name ) {
			state.animationLabel = action.label;
		}
		state[action.name] = action.value;
		return {...state};
	case actionType.BUILD:
		const cleanedClassList = removeAnimationFrom( state.className?.split( ' ' ) || []);
		if ( 'none' !== state.animation ) {
			cleanedClassList.push( 'animate__animated' );
			cleanedClassList.push( state.animation );
			if ( 'none' !== state.delay ) {
				cleanedClassList.push( state.delay );
			}
			if ( 'none' !== state.speed ) {
				cleanedClassList.push( state.speed );
			}
		}
		return {
			...state,
			build: cleanedClassList.join( ' ' )
		};
	case actionType.CONSUME_BUILD:
		return {
			...state,
			build: null
		};
	case actionType.UPDATE_USAGE:
		return {
			...state,
			mostUsedAnimations: filterMostUsedAnim( getAnimUsageFromStorage() )
		};
	case actionType.ADD_CLASSNAME:
		return {
			...state,
			className: action.className
		};
	case actionType.CLEAR_ON_END:
		break;
	}
};

function AnimationControls({
	attributes,
	clientId,
	setAttributes
}) {


	// const [ animation, setAnimation ] = useState( 'none' );
	// const [ delay, setDelay ] = useState( 'default' );
	// const [ speed, setSpeed ] = useState( 'default' );
	// const [ currentAnimationLabel, setCurrentAnimationLabel ] = useState( 'none' );
	// const [ mostUsedAnimations, setMostUsedAnimations ] = useState( null );
	const [ animationSettings, dispatch ] = useReducer( reducer, initialState );


	useEffect( () => {

		/**
		 * Extract the animation type, delay, and speed from the block className property
		 */
		dispatch({
			type: actionType.INIT,
			className: attributes.className
		});
	}, []);

	useEffect ( ()=>{

		/**
		 * Save in local storage information about the most used animations.
		 */
		if ( ! localStorage.themeisleAnimationUsage ) {
			const animationCounter = animationsList.reduce( ( counter, { label }) => {
				counter[label] = 0;
				return counter;
			}, {});

			localStorage.setItem( 'themeisleAnimationUsage', JSON.stringify( animationCounter ) );
			dispatch({
				type: actionType.UPDATE_USAGE
			});
		}
	}, []);

	useEffect( () => {
		if ( animationSettings.animation ) {
			incrementAnimUsage( animationSettings.animationLabel );
			dispatch({
				type: actionType.UPDATE_USAGE
			});
		}
	}, [ animationSettings.animation ]);

	useEffect( () => {
		if ( animationSettings.className !== attributes.className ) {
			dispatch({
				type: actionType.ADD_CLASSNAME,
				className: attributes.className
			});
		};
	}, [ attributes.className, animationSettings.className ]);

	useEffect( () => {
		dispatch({
			type: actionType.BUILD
		});
		const block = document.querySelector( `#block-${clientId} .animate__animated` );
		block?.addEventListener(
			'animationend',
			() => {
				block?.classList.remove( 'animate__animated' );
				block?.classList.remove( animationSettings.animation );
				block?.classList.remove( animationSettings.delay );
				block?.classList.remove( animationSettings.speed );
			}
		);
	}, [ animationSettings.animation, animationSettings.delay, animationSettings.speed ]);

	useEffect( () => {

		// console.log( animationSettings.build );
		if ( animationSettings.build || ( ! animationSettings.build && 'none' === animationSettings.animation )  ) {
			setAttributes({
				className: animationSettings.build
			});
			dispatch({
				type: actionType.CONSUME_BUILD
			});
		}
	}, [ animationSettings.build, animationSettings.animation ]);

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

		// const block = document.querySelector( `#block-${clientId} .animate__animated` );
		// if ( block ) {

		// 	// console.log( block );
		// 	block.addEventListener( 'animationend', () => {
		// 		console.log( 'Remove', animationCSSClass );
		// 		block.classList.remove( animationCSSClass, 'animate__animated' );
		// 	});
		// } else {
		// 	console.log( block );
		// }
	};

	const updateDelay = delayValue => {
		dispatch({
			type: actionType.UPDATE,
			name: 'delay',
			value: delayValue
		});
	};

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
				'none' !== animationSettings.animation && (
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

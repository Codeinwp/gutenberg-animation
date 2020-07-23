/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	Popover,
	SelectControl,
	TextControl

} = wp.components;

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
	categories,
	delayList,
	speedList,
	outAnimation
} from './data.js';


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
		}
	}, []);

	const [ animation, setAnimation ] = useState( 'none' );
	const [ delay, setDelay ] = useState( 'default' );
	const [ speed, setSpeed ] = useState( 'default' );
	const [ isVisible, setIsVisible ] = useState( false );
	const [ currentInput, setCurrentInput ] = useState( '' );


	const updateAnimation = e => {
		let classes;
		let animationValue = 'none' !== e ? e : '';

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
			classes = `animated ${animationValue}`;
		}

		if ( 'none' === e ) {
			classes = classes.replace( 'animated', '' ).replace( delay, '' ).replace( speed, '' );

			setDelay( 'default' );
			setSpeed( 'default' );
		}

		classes = classes.replace( /\s+/g, ' ' );

		setAnimation( e );
		setAttributes({ className: classes });

		let block = document.querySelector( `#block-${clientId} .animated` );

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

	const getAnimations = () => {
		let filteredAnimations = [];
		if ( currentInput ) {
			animationsList.map( animation => {

				//if ( animation.label.toLowerCase().includes( currentInput.toLowerCase() ) ) {
				let match = true;
				let inputWords = currentInput.toLowerCase().split( ' ' );
				inputWords.forEach( word => {
					if ( ! animation.label.toLowerCase().includes( word ) ) {
						match = false;
					}
				});

				if ( match ) {
					filteredAnimations.push(
						<div>
							<Button onClick={() => updateAnimation( animation.value )}>{animation.label}</Button>
						</div> );
				}
			}
			);
		}

		if ( ! currentInput ) {
			let categoryIndex = 0;
			animationsList.map( animation => {
				if ( categoryIndex < categories.length && animation.value.includes( categories[categoryIndex].value ) ) {
					categoryIndex++;
					filteredAnimations.push(
						<Fragment>
							<div className="category">
								{categories[categoryIndex - 1].label}
							</div>
							<div>
								<Button onClick={() => updateAnimation( animation.value )}>{animation.label}</Button>
							</div>
						</Fragment> );
				} else {
					filteredAnimations.push(
						<div>
							<Button onClick={() => updateAnimation( animation.value )}>{animation.label}</Button>
						</div>
					);
				}
			});
		}
		if ( ! filteredAnimations.length ) {
			filteredAnimations.push(
				<div>
					No animations found
				</div>
			);
		}
		return filteredAnimations;
	};


	return (
		<div className="themeisle-animations-control">
			<BaseControl
				label="Animation">
				<Button
					isSecondary
					className="animationButton"
					onClick={ ()=>setIsVisible( true )}
				>{animation || 'none'}
					{
						isVisible && (
							<Popover
								className="themeisle-animationPopover"
								noArrow={true}
								position='middle'
								onFocusOutside={()=>setIsVisible( false )}>
								<TextControl
									placeholder="search"
									value={currentInput}
									onChange={ setCurrentInput }
								/>
								<div>
									{getAnimations().map( animation => {
										return <div>{animation}</div>;
									})}
								</div>
							</Popover>
						)
					}
				</Button>
			</BaseControl>


			{
				'none' !== animation && (
					<Fragment>
						<SelectControl
							label={__( 'Delay' )}
							value={delay || 'default'}
							options={delayList}
							onChange={updateDelay}
						/>

						<SelectControl
							label={__( 'Speed' )}
							value={speed || 'default'}
							options={speedList}
							onChange={updateSpeed}
						/>
					</Fragment>
				)
			}
		</div >
	);
}

export default AnimationControls;

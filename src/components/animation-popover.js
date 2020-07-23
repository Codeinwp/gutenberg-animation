import {categories} from '../data.js';

const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	Popover,
	TextControl
} = wp.components;

const {
	Fragment,
	useState
} = wp.element;


function AnimationPopover({ animationsList, updateAnimation, currentAnimationLabel, setCurrentAnimationLabel}) {
	const [ isVisible, setIsVisible ] = useState( false );
	const [ currentInput, setCurrentInput ] = useState( '' );
	const [ animationFound, setAnimationFound ] = useState( false );

	const getAnimations =  animation  =>{
		let match = true;
		if ( currentInput ) {
			let inputWords = currentInput.toLowerCase().split( ' ' );
			inputWords.forEach( word => {
				if ( ! animation.label.toLowerCase().includes( word ) ) {
					match = false;
				}
			});
		}
		if ( match && ! animationFound ) {
			setAnimationFound( true );
		}
		return match && (
			<Button onClick={() => {
				setCurrentAnimationLabel( animation.label );
				setIsVisible( false );
				updateAnimation( animation.value );
			}}>{animation.label}</Button>
		);
	};

	return (
		<BaseControl
			label="Animation">
			<Button
				isSecondary
				className="animationButton"
				onClick={() => {
					setIsVisible( ! isVisible );
				}}
			>{currentAnimationLabel}
			</Button>
			{
				isVisible && (
					<Popover
						className="themeisle-animationPopover"
						noArrow={true}
						position='center'
						onFocusOutside={e =>{
							'components-button animationButton is-secondary' !== e.relatedTarget.className ?
								setIsVisible( false ) :
								'';
						}}>
						<TextControl
							placeholder="Search animations"
							value={currentInput}
							onChange={e=>{
								setCurrentInput( e ); setAnimationFound( false );
							}}
						/>
						{animationsList.map( animation=>{
							return (
								<Fragment>
									{
										'' === currentInput ?
											categories.map( category=>{
												return category.value === animation.value ?
													<div className="category">
														{category.label}
													</div> : '';
											}) : ''
									}

									<div className={`${currentAnimationLabel === animation.label ? 'animation-is-selected' : ''}`}>
										{getAnimations( animation )}
									</div>
								</Fragment>
							);
						})}
						{
							! animationFound &&
                            <div>{__( 'No animations found' )}</div>
						}
					</Popover>
				)
			}
		</BaseControl>
	);
}

export default AnimationPopover;

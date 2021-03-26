/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	Dropdown,
	MenuGroup,
	MenuItem,
	TextControl
} = wp.components;

const { useInstanceId } = wp.compose;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies.
 */
import { categories } from '../data.js';

function AnimationPopover({
	animationsList,
	updateAnimation,
	currentAnimationLabel,
	setCurrentAnimationLabel,
	mostUsedAnimations
}) {
	const instanceId = useInstanceId( AnimationPopover );

	const [ currentInput, setCurrentInput ] = useState( '' );
	const [ animationFound, setAnimationFound ] = useState( false );

	const getAnimations = ( animation, onToggle ) => {
		if ( ! currentInput && 'None' === animation.label ) {
			return;
		};
		let match = true;

		if ( currentInput ) {
			const inputWords = currentInput.toLowerCase().split( ' ' );
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
			<MenuItem
				className={ currentAnimationLabel === animation.label ? 'is-selected' : '' }
				onClick={ () => {
					setCurrentAnimationLabel( animation.label );
					updateAnimation( animation.label, animation.value );
					onToggle();
				} }
			>
				{ animation.label }
			</MenuItem>
		);
	};

	const id = `inspector-themeisle-animations-control-${ instanceId }`;

	return (
		<BaseControl
			label={ __( 'Animation' ) }
			id={ id }
		>
			<Dropdown
				contentClassName="themeisle-animations-control__popover"
				position="bottom center"
				renderToggle={ ({ isOpen, onToggle }) => (
					<Button
						isLarge
						className="themeisle-animations-control__button"
						id={ id }
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ currentAnimationLabel }
					</Button>
				) }
				renderContent={ ({ onToggle }) => (
					<MenuGroup label={ __( 'Animations' ) }>
						<TextControl
							placeholder={ __( 'Search' ) }
							value={ currentInput }
							onChange={ e => {
								setCurrentInput( e );
								setAnimationFound( false );
							}}
						/>

						<div className="components-popover__items">
							{
								'' === currentInput ?
									<MenuItem
										className={'None' === currentAnimationLabel ? 'is-selected' : ''}
										onClick={() => {
											setCurrentAnimationLabel( 'None' );
											updateAnimation( 'None', 'none' );
											onToggle();
										}}
									>
										{__( 'None' )}
									</MenuItem> : ''
							}
							{
								mostUsedAnimations && '' === currentInput ?
									<div className="themeisle-animations-control__category">
										{__( 'Most used animations' )}
									</div> : ''
							}
							{
								mostUsedAnimations && '' === currentInput ?
									mostUsedAnimations.map( animation=>{
										return <MenuItem
											onClick={() => {
												setCurrentAnimationLabel( animation );
												updateAnimation( animation );
												onToggle();
											}}
										>
											{animation}
										</MenuItem>;
									}) : ''
							}
							{ animationsList.map( animation => {
								return (
									<Fragment>
										{ '' === currentInput &&
											categories.map( category => {
												return category.value === animation.value ?
													<div className="themeisle-animations-control__category">
														{ category.label }
													</div> : '';
											})
										}

										{ getAnimations( animation, onToggle ) }
									</Fragment>
								);
							}) }

							{ ! animationFound && <div>{ __( 'Nothing found. Try searching for something else!' ) }</div> }
						</div>
					</MenuGroup>
				) }
			/>
		</BaseControl>
	);
}

export default AnimationPopover;

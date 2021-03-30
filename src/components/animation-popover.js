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
	mostUsedAnimations
}) {
	const instanceId = useInstanceId( AnimationPopover );

	const [ searchInput, setSearchInput ] = useState( '' );
	const [ animationFound, setAnimationFound ] = useState( false );

	const getAnimationWithSearch = ( animation, onToggle ) => {
		if ( ! searchInput && 'None' === animation.label ) {
			return;
		} else if ( '' === searchInput ) {
			return (
				<MenuItem
					className={ currentAnimationLabel === animation.label ? 'is-selected' : '' }
					onClick={ () => {
						updateAnimation( animation.label, animation.value );
						onToggle();
					} }
				>
					{ animation.label }
				</MenuItem>
			);
		}

		const isMatchWithSearch = animation.label.toLowerCase().startsWith( searchInput.toLowerCase().trim() );

		if ( isMatchWithSearch && ! animationFound ) {
			setAnimationFound( true );
		}

		return isMatchWithSearch && (
			<MenuItem
				className={ currentAnimationLabel === animation.label ? 'is-selected' : '' }
				onClick={ () => {
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
							value={ searchInput }
							onChange={ e => {
								setSearchInput( e );
								setAnimationFound( false );
							}}
						/>

						<div className="components-popover__items">
							{
								'' === searchInput ?
									<MenuItem
										className={'None' === currentAnimationLabel ? 'is-selected' : ''}
										onClick={() => {
											updateAnimation( 'None', 'none' );
											onToggle();
										}}
									>
										{__( 'None' )}
									</MenuItem> : ''
							}
							{
								mostUsedAnimations && '' === searchInput ?
									<div className="themeisle-animations-control__category">
										{__( 'Most used animations' )}
									</div> : ''
							}
							{
								mostUsedAnimations && '' === searchInput ?
									mostUsedAnimations.map( animation=>{
										return <MenuItem
											onClick={() => {
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
										{ '' === searchInput &&
											categories.map( category => {
												return category.value === animation.value ?
													<div className="themeisle-animations-control__category">
														{ category.label }
													</div> : '';
											})
										}

										{ getAnimationWithSearch( animation, onToggle ) }
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

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPicker,
	Button,
	ButtonGroup
} = wp.components;

const { Fragment, useState } = wp.element;

const Inspector = ({
	attributes,
	setAttributes,
	actions,
	playerRef,
	error
}) => {

	const [ enableBackground, setEnableBackground ] = useState( ! '#ffffff' !== attributes.background );

	const setAutoplay = ( value ) => {
		setAttributes({ autoplay: value });
	};

	const setLoop = ( value ) => {

		const { instance } = playerRef.current.state;
		instance.loop = value;
		playerRef.current.setState({ instance: instance });

		setAttributes({ loop: value });
	};

	const setRenderer = ( value ) => {
		setAttributes({ renderer: value });
	};

	const setSpeed = ( value ) => {
		setAttributes({ speed: Number( value ) });
	};

	const setControls = ( value ) => {
		setAttributes({ controls: value });
	};

	const setBackground = ( value ) => {
		playerRef.current.setState({ background: value.hex });

		setAttributes({ background: value.hex });
	};

	const resetBackground = () => {
		playerRef.current.setState({ background: '#ffffff' });

		setAttributes({ background: '#ffffff' });
	};

	const setHover = ( value ) => {
		setAttributes({ hover: value });
	};

	const setHeight = ( value ) => {
		setAttributes({ height: value });
	};

	const setWidth = ( value ) => {
		setAttributes({ width: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>

				<TextControl
					className={ classnames( 'wp-block-themeisle-inspector-src', { 'error': error })}
					label= { __( 'Lottie Animation URL ' ) }
					help={ __( 'Ex: https://assets1.lottiefiles.com/datafiles/jEgAWaDrrm6qdJx/data.json' ) }
					type='text'
					value={ attributes.src }
					onChange={ value => setAttributes({ src: value }) }
				/>

				{
					attributes.src && (
						<Fragment>

							<ButtonGroup>
								<Button
									isPrimary
									onClick={ actions.play }
								>
								Play
								</Button>

								<Button
									isPrimary
									onClick={ actions.pause }
								>
								Pause
								</Button>

								<Button
									isPrimary
									onClick={ actions.stop }
								>
								Stop
								</Button>
							</ButtonGroup>

							<ToggleControl
								label={ __( 'Autoplay' ) }
								help={ __( 'Set the animation to play automaticaly after loading.' ) }
								checked={ attributes.autoplay }
								onChange={ setAutoplay }
							/>

							<ToggleControl
								label={ __( 'Loop' ) }
								help={ __( 'Whether to loop animation.' ) }
								checked={ attributes.loop }
								onChange={ setLoop }
							/>

							<RangeControl
								label={ __( 'Height' ) }
								help={ __( 'Animation height in pixels.' ) }
								value={ attributes.height }
								onChange={ setHeight }
								min={ 100 }
								max={ 800 }
							/>

							<RangeControl
								label={ __( 'Width' ) }
								help={ __( 'Animation width in pixels.' ) }
								value={ attributes.width }
								onChange={ setWidth }
								min={ 100 }
								max={ 800 }
							/>

							<ToggleControl
								label={ __( 'Custom Background' ) }
								help={ __( 'Set a custom background color.' ) }
								checked={ enableBackground }
								onChange={ setEnableBackground }
							/>

							{ enableBackground && (
								<Fragment>
									<Button
										className="wp-block-themeisle-inspector-background"
										onClick={ resetBackground }
										isTertiary
										isDestructive
									>
										Reset
									</Button>

									<ColorPicker
										color={ attributes.background }
										onChangeComplete={ setBackground }
										disableAlpha
									/>
								</Fragment>
							)}

							<ToggleControl
								label={ __( 'Controls' ) }
								help={ __( 'Show controls ( play, stop, ...) to user.' ) }
								checked={ attributes.controls }
								onChange={ setControls }
							/>

							<ToggleControl
								label={ __( 'Hover' ) }
								help={ __( 'Whether to play on mouse hover.' ) }
								checked={ attributes.hover}
								onChange={ setHover }
							/>

							<TextControl
								label= { __( 'Speed' ) }
								help={ __( 'Animation speed.' ) }
								type='number'
								value={ attributes.speed }
								onChange={ setSpeed }
							/>

							<SelectControl
								label= { __( 'Renderer' ) }
								help={ __( 'Renderer to use.' ) }
								options= { [
									{ label: 'svg', value: 'svg' },
									{ label: 'html', value: 'html' }
								] }
								value={ attributes.renderer }
								onChange={ setRenderer }
							/>
						</Fragment>
					)
				}


			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;


/**
 * External dependencies
 */
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import classnames from 'classnames';
import { pencil, Icon } from '@wordpress/icons';

/**
 * Wordpress dependencies
 */
const { __ } = wp.i18n;

const {
	TextControl,
	Placeholder,
	Button,
	Notice,
	ToolbarGroup,
	ToolbarButton,
	ExternalLink
} = wp.components;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

import { v4 as uuidv4 } from 'uuid';

const { BlockControls } = wp.blockEditor;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import { LOOP_OPTIONS } from './constants.js';

const LottiePlayer = ({ attributes, setAttributes, isSelected }) => {

	useEffect( () => {
		setAttributes({ id: uuidv4()}); // TODO: change it to uuid
	}, []);

	const playerRef = useRef( null );
	const [ src, setSrc ] = useState( attributes.src );
	const [ showEdit, setShowEdit ] = useState( ! attributes.src );
	const [ error, setError ] = useState( false );

	const getLoop = () => {
		switch ( attributes.loopType ) {
		case LOOP_OPTIONS.NONE:
			return false;
		case LOOP_OPTIONS.CONTINUOUS:
			return true;
		case LOOP_OPTIONS.CONTINUOUS:
			return attributes.loopCount;
		}
	};

	const setLoopToPlayer = ()  => {

		if ( ! playerRef.current.state.instance ) {
			return;
		}

		const { instance } = playerRef.current.state;

		switch ( attributes.loopType ) {
		case LOOP_OPTIONS.NONE:
			instance.loop = false;
			break;
		case LOOP_OPTIONS.CONTINUOUS:
			instance.loop = true;
			break;
		case LOOP_OPTIONS.COUNTED:
			instance.loop = attributes.loopCount - 1;
			break;
		}

		playerRef.current.setState({ instance: instance });
	};

	useEffect( () => {
		if ( playerRef.current ) {
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
			setLoopToPlayer( playerRef );
		}

		if ( playerRef.current ) {
			const { playerState } = playerRef.current.state;
			if ( playerState ) {
				if ( 'error' === playerState ) {
					setAttributes({ src: '' });
					setError( true );
				}
			}
		}
	}, [ attributes ]);

	useEffect( () => {
		if ( playerRef.current ) {
			if ( ! isSelected ) {
				playerRef.current.stop();
			}
		}
	}, [ isSelected ]);

	const validateURL = url => {
		const expression = /(http(s)?:\/\/.){1}(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)([-a-zA-Z0-9_]\.json)/;
		const regex = new RegExp( expression );

		return url.match( regex );
	};

	const setSrcToAttributes = ( ) => {

		if ( validateURL( src ) ) {
			setAttributes({ src });
			setShowEdit( false );
		} else {
			setError( true );
		}
	};

	const eventHandeler = event => {

		if ( 'load' === event ) {

			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
			setLoopToPlayer();
			setError( false );
		}
	};


	const renderPlayer = () => {

		if ( ! attributes.src || showEdit ) {
			return (
				<Placeholder
					label={ 'Lottie Animation URL' }
					className="wp-block-themeisle-block-embed"
					instructions={ __(
						'Paste a link to the content you want to display on your site.'
					) }
				>
					<div className="wp-block-themeisle-block-embed-form">
						<TextControl
							className={ classnames( 'wp-block-themeisle-block-src', 'components-placeholder__input', { 'error': error })}
							placeholder={ __( 'The URl must return a valid Lottie file. ' )}
							help={ __( 'Ex: https://assets1.lottiefiles.com/datafiles/jEgAWaDrrm6qdJx/data.json' ) }
							type='url'
							value={ src }
							onChange={ setSrc }
						/>

						<Button
							isPrimary
							onClick={ setSrcToAttributes }
						>
							{ __( 'Add Animation' ) }
						</Button>
					</div>
					<div >
						<ExternalLink
							href={ __(
								'https://lottiefiles.com/what-is-lottie'
							) }
						>
							{ __( 'Learn more about Lottie' ) }
						</ExternalLink>
					</div>

				</Placeholder>
			);
		}

		return (
			<Player
				ref= { playerRef }
				src={ attributes.src }
				style={{ height: `${ attributes.height }px`, width: `${ attributes.width }px` }}
				background={ attributes.backgroundColor }
				hover={ attributes.hover }
				loop={ getLoop() }
				direction={ attributes.direction }
				controls={ attributes.controls }
				autoplay={ attributes.autoplay }
				renderer={ attributes.renderer }
				onEvent={ eventHandeler }
			>
				{ isSelected && (
					<Controls visible={ true } buttons={[ 'play', 'stop', 'frame', 'debug' ]} />
				)}
			</Player>
		);
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				setSrc= { setSrc }
				playerRef={ playerRef }
				error={ error }
			/>

			<BlockControls>
				<ToolbarGroup>
					{ ! showEdit && (
						<ToolbarButton
							label={ __( 'Edit URL' ) }
							icon={ <Icon icon={ pencil } /> }
							onClick={ setShowEdit }
						/>
					)}
				</ToolbarGroup>
			</BlockControls>

			{ error && (
				<Notice
					isDismissible
					status="error"
					onRemove={ () => setError( false )}
				>
					<p>Invalid URL</p>
				</Notice>
			)}
			{ renderPlayer() }

		</Fragment>
	);
};

export default LottiePlayer;


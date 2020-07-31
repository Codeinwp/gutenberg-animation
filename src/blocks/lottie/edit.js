/**
 * External dependencies
 */
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import classnames from 'classnames';

/**
 * Wordpress dependencies
 */
const { __ } = wp.i18n;

const {
	TextControl,
	Placeholder,
	Button,
	Notice
} = wp.components;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

const { uniqueId } = lodash;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';

const LottiePlayer = props => {

	const { attributes, setAttributes } = props;
	const playerRef = useRef( null );
	const [ src, setSrc ] = useState( attributes.src );
	const [ error, setError ] = useState( false );

	useEffect( () => {
		setAttributes({ id: uniqueId( 'lottie_anim_' )});
	}, []);

	useEffect( () => {
		if ( playerRef.current ) {
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
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

	const setSrcToAttributes = ( ) => {
		setAttributes({ src });
	};

	const eventHandeler = event => {

		if ( 'load' === event ) {
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
			setError( false );
		}
	};

	const play = () => {
		if ( playerRef.current ) {
			playerRef.current.play();
		}
	};

	const pause = () => {
		if ( playerRef.current ) {
			playerRef.current.pause();
		}
	};

	const stop = () => {
		if ( playerRef.current ) {
			playerRef.current.stop();
		}
	};

	const renderPlayer = () => {

		if ( ! attributes.src ) {
			return (
				<Placeholder
					label={ 'Lottie Animation URL' }
					className="wp-block-embed"
					instructions={ __(
						'Paste a link to the content you want to display on your site.'
					) }
				>
					<TextControl
						className={ classnames( 'wp-block-themeisle-block-src', { 'error': error })}
						help={ __( 'Ex: https://assets1.lottiefiles.com/datafiles/jEgAWaDrrm6qdJx/data.json' ) }
						type='text'
						value={ src }
						onChange={ setSrc }
					/>

					<Button
						isPrimary
						onClick={ setSrcToAttributes }
					>
						Add Animation
					</Button>
				</Placeholder>
			);
		}

		return (
			<Player
				ref= { playerRef }
				src={ attributes.src }
				style={{ height: `${ attributes.height }px`, width: `${ attributes.width }px` }}
				background={ attributes.background }
				loop={ attributes.loop }
				hover={ attributes.hover }
				direction={ attributes.direction }
				controls={ attributes.controls }
				autoplay={ attributes.autoplay }
				renderer={ attributes.renderer }
				onEvent={ eventHandeler }
			>
				<Controls visible={ true } buttons={[ 'play', 'frame', 'debug' ]} />
			</Player>
		);
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				setSrc= { setSrc }
				actions={{ play, pause, stop }}
				playerRef={ playerRef }
				error={ error }
			/>
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


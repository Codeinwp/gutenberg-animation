/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	SelectControl
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies.
 */
import {
	animation,
	delay,
	speed
} from './data.js';

class AnimationControls extends Component {
	constructor() {
		super( ...arguments );

		this.updateAnimation = this.updateAnimation.bind( this );
		this.updateDelay = this.updateDelay.bind( this );
		this.updateSpeed = this.updateSpeed.bind( this );

		this.state = {
			animation: 'none',
			delay: 'default',
			speed: 'default'
		};
	}

	componentDidMount() {
		let classes;

		if ( this.props.attributes.className ) {
			classes = this.props.attributes.className;
			classes = classes.split( ' ' );

			const animationClass = Array.from( animation ).find( i => {
				return classes.find( o => o === i.value );
			});

			const delayClass = Array.from( delay ).find( i => {
				return classes.find( o => o === i.value );
			});

			const speedClass = Array.from( speed ).find( i => {
				return classes.find( o => o === i.value );
			});

			this.setState({
				animation: animationClass ? animationClass.value : 'none',
				delay: delayClass ? delayClass.value : 'default',
				speed: speedClass ? speedClass.value : 'default'
			});
		}
	}

	updateAnimation( e ) {
		let classes;
		let animationValue = 'none' !== e ? e : '';

		if ( this.props.attributes.className ) {
			classes = this.props.attributes.className;
			classes = classes.split( ' ' );
			const exists = classes.find( i => i === this.state.animation );
			const animatedExists = classes.find( i => 'animated' === i );

			if ( ! animatedExists ) {
				classes.push( 'animated' );
			}

			if ( exists ) {
				classes = classes.join( ' ' ).replace( this.state.animation, animationValue );
			} else {
				classes.push( animationValue );
				classes = classes.join( ' ' );
			}
		} else {
			classes = `animated ${ animationValue }`;
		}

		if ( 'none' === e ) {
			classes = classes.replace( 'animated', '' ).replace( this.state.delay, '' ).replace( this.state.speed, '' );

			this.setState({
				delay: 'default',
				speed: 'defualt'
			});
		}

		classes = classes.replace( /\s+/g, ' ' );

		this.setState({ animation: e });
		this.props.setAttributes({ className: classes });
	}

	updateDelay( e ) {
		let classes;
		let delayValue = 'none' !== e ? e : '';

		if ( this.props.attributes.className ) {
			classes = this.props.attributes.className;
			classes = classes.split( ' ' );
			const exists = classes.find( i => i === this.state.delay );

			if ( exists ) {
				classes = classes.join( ' ' ).replace( this.state.delay, delayValue );
			} else {
				classes.push( delayValue );
				classes = classes.join( ' ' );
			}
		} else {
			classes = delayValue;
		}

		classes = classes.replace( /\s+/g, ' ' );

		this.setState({ delay: e });
		this.props.setAttributes({ className: classes });
	}

	updateSpeed( e ) {
		let classes;
		let speedValue = 'none' !== e ? e : '';

		if ( this.props.attributes.className ) {
			classes = this.props.attributes.className;
			classes = classes.split( ' ' );
			const exists = classes.find( i => i === this.state.speed );

			if ( exists ) {
				classes = classes.join( ' ' ).replace( this.state.speed, speedValue );
			} else {
				classes.push( speedValue );
				classes = classes.join( ' ' );
			}
		} else {
			classes = speedValue;
		}

		classes = classes.replace( /\s+/g, ' ' );

		this.setState({ speed: e });
		this.props.setAttributes({ className: classes });
	}

	render() {
		return (
			<Fragment>
				<SelectControl
					label={ __( 'Animation' ) }
					value={ this.state.animation || 'none' }
					options={ animation }
					onChange={ this.updateAnimation }
				/>

				{ 'none' !== this.state.animation && (
					<Fragment>
						<SelectControl
							label={ __( 'Delay' ) }
							value={ this.state.delay || 'default' }
							options={ delay }
							onChange={ this.updateDelay }
						/>

						<SelectControl
							label={ __( 'Speed' ) }
							value={ this.state.speed || 'default' }
							options={ speed }
							onChange={ this.updateSpeed }
						/>
					</Fragment>
				) }
			</Fragment>
		);
	}
}

export default AnimationControls;

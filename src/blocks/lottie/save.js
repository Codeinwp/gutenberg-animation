const { Fragment } = wp.element;
import  '@lottiefiles/lottie-player';

const Save = ({ attributes }) => {

	return (
		<Fragment>
			<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
			<lottie-player
				id={ attributes.id }
				src={ attributes.src }
				speed={ attributes.speed }
				style={{ height: `${ attributes.height }px`, width: `${ attributes.width }px` }}
				background={ attributes.background }
				loop={ attributes.loop }
				hover={ attributes.hover }
				direction={ attributes.direction }
				controls={ attributes.controls }
				autoplay={ attributes.autoplay }
				renderer={ attributes.renderer }
			></lottie-player>
		</Fragment>
	);
};

export default Save;

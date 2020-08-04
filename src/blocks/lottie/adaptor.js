const { omit } = lodash;
import { LOOP_OPTIONS } from './constants.js';


export const playerProps = props => {
	const { loopType, loopCount, backgroundColor, height, width } = props;

	const getLoopOptions = () => {
		switch ( loopType ) {
		case LOOP_OPTIONS.NONE:
			return { loop: false };
		case LOOP_OPTIONS.CONTINUOUS:
			return { loop: true };
		case LOOP_OPTIONS.COUNTED:
			return { loop: true, count: loopCount - 1 };
		}
	};

	// props that doesn't need aditional modifications
	const pureProps = omit( props, [ 'loop', 'loopType', 'loopCount', 'backgroundColor', 'height', 'width' ]);

	return {
		...pureProps,
		...getLoopOptions(),
		background: backgroundColor,
		style: { height: `${ height }px`, width: `${ width }px` }
	};
};

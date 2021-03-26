import { animationsList, animationsListOld, delayList, delayListOld, speedList, speedListOld } from './data';

export const removeAllAnimations = ( classList ) => {
	return classList.filter( classAnim => ! animationsList.includes( classAnim ) || ! animationsListOld.includes( classAnim ) );
};

export const removeAllDelays = ( classList ) => {
	return classList.filter( classAnim => ! delayList.includes( classAnim ) || ! delayListOld.includes( classAnim ) );
};

export const removeAllSpeed = ( classList ) => {
	return classList.filter( classAnim => ! speedList.includes( classAnim ) || ! speedListOld.includes( classAnim ) );
};

export const updateAnimationVersion = ( classList ) => {
	return classList.map( classAnim => {
		if ( 'animated' === classAnim || animationsListOld.includes( classAnim ) || delayListOld.includes( classAnim ) || speedList.includes( classAnim ) ) {
			return 'animate__' + classAnim;
		} else if ( 'shake' === classAnim ) {
			return 'animate__shakeX';
		}
		return classAnim;
	});
};

export const updateHTMLClassListAnimVersion = ( htmlClassList ) => {
	Array.from( htmlClassList ).forEach( classAnim => {
		if ( 'animated' === classAnim || animationsListOld.includes( classAnim ) || delayListOld.includes( classAnim ) || speedList.includes( classAnim ) ) {
			htmlClassList.remove( classAnim );
			htmlClassList.add( 'animate__' + classAnim );
		} else if ( 'shake' === classAnim ) {
			htmlClassList.remove( classAnim );
			htmlClassList.add( 'animate__shakeX' );
		}
	});

};

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

export const extractAnimationFrom = ( classList, type ) => {
	switch ( type ) {
	case 'animation':
		return classList.filter( classCSS => animationsList.find( ({ value }) => value === classCSS ) ).pop();
	case 'delay':
		return classList.filter( classCSS => delayList.find( ({ value }) => value === classCSS )  ).pop();
	case 'speed':
		return classList.filter( classCSS => speedList.find( ({ value }) => value === classCSS ) ).pop();
	default:
		return undefined;
	}
};

export const removeAnimationFrom = ( classList ) => {
	return classList
		.filter( classCSS => ! animationsList.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! delayList.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! speedList.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => 'animate__animated' !== classCSS );
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

/* Utlity functions for working with the storage */
export const getAnimUsageFromStorage = () => JSON.parse( localStorage.getItem( 'themeisleAnimationUsage' ) );

export const filterMostUsedAnim = storageAnimations => {
	let sortedAnimations = Object.keys( storageAnimations ).sort( ( a, b ) => {
		return storageAnimations[b] - storageAnimations[a];
	});
	const mostUsed = sortedAnimations.filter( anim => 'None' !== anim && 0 < storageAnimations[anim]).slice( 0, 5 );
	return mostUsed;
};

export const incrementAnimUsage = ( key ) => {
	const usage = getAnimUsageFromStorage();
	usage[key] += 1;
	localStorage.setItem( 'themeisleAnimationUsage', JSON.stringify( usage ) );
};

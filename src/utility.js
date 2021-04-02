import { animationsList, animationsListOld, delayList, delayListOld, speedList, speedListOld } from './data';

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

export const removeOldAnimationFrom = ( classList ) => {
	return classList
		.filter( classCSS => ! animationsListOld.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! delayListOld.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! speedListOld.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => 'animated' !== classCSS );
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

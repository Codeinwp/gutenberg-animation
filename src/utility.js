import { animationsList, animationsListOld, delayList, delayListOld, speedList, speedListOld } from './data';

/**
 * Extract the CSS class from the array that is a valid class of the animate.js
 * @param {string[]} classList The array with the CSS classes name
 * @param {'animation' | 'delay' | 'speed'} type The type of the animation CSS class
 * @returns {string | undefined} The CSS class corresponding to the given type that exists on the input array.
 */
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

/**
 * Remove anime.js CSS classes for animation from array
 * @param {string[]} classList An array with current CSS classes
 * @returns Return the array without the animate.js classes for the animation's name.
 */
export const removeAnimationFrom = ( classList ) => {
	return classList
		.filter( classCSS => ! animationsList.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! delayList.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! speedList.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => 'animate__animated' !== classCSS );
};

/**
 * Remove old versions of the anime.js for the animation name
 * @param {string[]} classList An array with current CSS classes
 * @returns Return the array without the animate.js classes for animation name
 */
export const removeOldAnimationFrom = ( classList ) => {
	return classList
		.filter( classCSS => ! animationsListOld.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! delayListOld.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => ! speedListOld.find( ({ value }) => value === classCSS ) )
		.filter( classCSS => 'animated' !== classCSS );
};

/**
 * Transform the old CSS classes of the animotion.js v3.7.2 to the current version.
 * @param {string[]} classList An array with current CSS classes
 * @returns An array with the CSS classes converted to the current version.
 */
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


/**
 * Get the information from storage about the animations usage
 * @returns {Object}
 */
export const getAnimUsageFromStorage = () => JSON.parse( localStorage.getItem( 'themeisleAnimationUsage' ) );

/**
 * Get the top 5 most used animation from the giving object
 * @param {Object} storageAnimations An object the information about the usage of animation
 * @returns Top 5 most used animations
 */
export const filterMostUsedAnim = storageAnimations => {
	let sortedAnimations = Object.keys( storageAnimations ).sort( ( a, b ) => {
		return storageAnimations[b] - storageAnimations[a];
	});
	const mostUsed = sortedAnimations.filter( anim => 'None' !== anim && 0 < storageAnimations[anim]).slice( 0, 5 );
	return mostUsed;
};

/**
 * Increment with one the given animation name and save to storage
 * @param {string} key The name of the animation
 */
export const incrementAnimUsage = ( key ) => {
	const usage = getAnimUsageFromStorage();
	usage[key] += 1;
	localStorage.setItem( 'themeisleAnimationUsage', JSON.stringify( usage ) );
};

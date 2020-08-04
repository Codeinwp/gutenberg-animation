
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import edit from './edit.js';
import save from './save.js';
import attributes from './attributes.js';

registerBlockType( 'themeisle-blocks/lottie-animation', {
	title: __( 'Lottie Animations - Experimental' ),
	description: __( 'Embed Lottie content' ),
	category: 'embed',
	keywords: [
		'embed',
		'lottie',
		'animation'
	],
	attributes,
	edit,
	save
});

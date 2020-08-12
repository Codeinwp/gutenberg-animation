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
	title: __( 'Lottie' ),
	description: __( 'Add Lottie animations to your WordPress.' ),
	category: 'media',
	keywords: [
		'media',
		'lottie',
		'animation'
	],
	attributes,
	edit,
	save
});

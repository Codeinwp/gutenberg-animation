/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { hasBlockSupport } = wp.blocks;

const { PanelBody } = wp.components;

const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor || wp.editor;

const { Fragment } = wp.element;

const { addFilter } = wp.hooks;

/**
 * Internal dependencies.
 */
import AnimationControls from './editor.js';
import { removeAnimationFrom } from './utility.js';

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const hasCustomClassName = hasBlockSupport( props.name, 'customClassName', true );

		// TODO: remove animation on load
		/* This will remove the animation when is selected */
		if ( hasCustomClassName ) {
			window.addEventListener( 'load', () => {
				const block = document.querySelector( `#block-${props.clientId} .animate__animated` );
				if ( block ) {
					block.addEventListener(
						'animationend',
						() => {
							block?.classList.remove( 'animate__animated' );
						}
					);
					block.className = removeAnimationFrom( Array.from( block?.classList ) ).join( ' ' );
				}
			});
		}

		if ( hasCustomClassName && props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__( 'Animations' )}
							initialOpen={false}
						>
							<AnimationControls
								clientId={props.clientId}
								setAttributes={props.setAttributes}
								attributes={props.attributes}

							/>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		}

		return <BlockEdit {...props} />;
	};
}, 'withInspectorControl' );

addFilter( 'editor.BlockEdit', 'themeisle-custom-css/with-inspector-controls', withInspectorControls );

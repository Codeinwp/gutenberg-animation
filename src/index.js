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

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const hasCustomClassName = hasBlockSupport( props.name, 'customClassName', true );
		if ( hasCustomClassName && props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody
							title={ __( 'Animations' ) }
							initialOpen={ false }
						>
							<AnimationControls
								clientId={ props.clientId }
								setAttributes={ props.setAttributes }
								attributes={ props.attributes }
							/>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withInspectorControl' );

addFilter( 'editor.BlockEdit', 'themeisle-custom-css/with-inspector-controls', withInspectorControls );

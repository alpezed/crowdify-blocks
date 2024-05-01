/**
 * Internal Dependencies
 */
import CountUp from 'react-countup';

/**
 * Internal Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	RangeControl,
	__experimentalGrid as Grid, // eslint-disable-line
	__experimentalToolsPanel as ToolsPanel, // eslint-disable-line
	__experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
	__experimentalInputControl as InputControl, // eslint-disable-line
	TextControl, // eslint-disable-line
} from '@wordpress/components';

/**
 * Import Styles
 */
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes, uniqueId } = props;
	const { counterNumber, duration, prefix, suffix, startVal } = attributes;

	const inspectorControls = (
		<InspectorControls>
			<ToolsPanel label={ __( 'Settings' ) }>
				<ToolsPanelItem
					hasValue={ () => !! counterNumber }
					label={ __( 'Counter Number' ) }
					isShownByDefault
					onDeselect={ () =>
						setAttributes( { counterNumber: undefined } )
					}
				>
					<InputControl
						label={ __( 'Counter Number', 'crowdify-blocks' ) }
						type="number"
						value={ counterNumber }
						onChange={ ( newValue ) =>
							setAttributes( { counterNumber: newValue } )
						}
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					hasValue={ () => !! duration }
					label={ __( 'Duration' ) }
					isShownByDefault
					onDeselect={ () =>
						setAttributes( { duration: undefined } )
					}
				>
					<RangeControl
						label={ __( 'Duration', 'crowdify-blocks' ) }
						value={ duration }
						help={ __( 'animation duration in seconds (2)' ) }
						onChange={ ( newValue ) =>
							setAttributes( { duration: newValue } )
						}
						min={ 0 }
						max={ 10000 }
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					hasValue={ () => !! startVal }
					label={ __( 'Start Value' ) }
					isShownByDefault
					onDeselect={ () =>
						setAttributes( { startVal: undefined } )
					}
				>
					<RangeControl
						label={ __( 'Start Value', 'crowdify-blocks' ) }
						value={ startVal }
						help={ __( 'number to start at (0)' ) }
						onChange={ ( newValue ) =>
							setAttributes( { startVal: newValue } )
						}
						min={ 0 }
						max={ 10000 }
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					hasValue={ () => !! prefix || !! suffix }
					label={ __( 'Suffix & Prefix' ) }
					isShownByDefault
					onDeselect={ () => {
						setAttributes( { prefix: undefined } );
						setAttributes( { suffix: undefined } );
					} }
				>
					<Grid columns={ 2 }>
						<TextControl
							label={ __( 'Prefix', 'crowdify-blocks' ) }
							value={ prefix }
							help={ __( 'text prepended to result' ) }
							onChange={ ( value ) =>
								setAttributes( { prefix: value } )
							}
						/>
						<TextControl
							label={ __( 'Suffix', 'crowdify-blocks' ) }
							help={ __( 'text appended to result' ) }
							value={ suffix }
							onChange={ ( value ) =>
								setAttributes( { suffix: value } )
							}
						/>
					</Grid>
				</ToolsPanelItem>
			</ToolsPanel>
		</InspectorControls>
	);

	return (
		<>
			{ inspectorControls }
			<div
				{ ...useBlockProps( {
					className: uniqueId,
				} ) }
			>
				<CountUp
					startVal={ startVal }
					end={ counterNumber }
					prefix={ prefix }
					suffix={ suffix }
					duration={ duration }
					enableScrollSpy
				/>
			</div>
		</>
	);
}

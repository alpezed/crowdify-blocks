/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { list, grid } from '@wordpress/icons';

export const PostTemplateCustomToolbar = ( {
	displayLayout,
	setDisplayLayout,
} ) => {
	const displayLayoutControls = [
		{
			icon: list,
			title: __( 'List view' ),
			onClick: () => setDisplayLayout( { type: 'default' } ),
			isActive:
				displayLayout?.type === 'default' ||
				displayLayout?.type === 'constrained',
		},
		{
			icon: grid,
			title: __( 'Grid view' ),
			onClick: () => setDisplayLayout( { type: 'grid' } ),
			isActive: displayLayout?.type === 'grid',
		},
		{
			icon: (
				<svg
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					width={ 24 }
					height={ 24 }
					aria-hidden="true"
					focusable="false"
				>
					<path
						d="m6 4.75h12c.6904 0 1.25.55964 1.25 1.25v12c0 .6904-.5596 1.25-1.25 1.25h-12c-.69036 0-1.25-.5596-1.25-1.25v-12c0-.69036.55964-1.25 1.25-1.25z"
						stroke="currentColor"
						strokeWidth="1.5"
						fill="none"
					/>
					<g fill="currentColor">
						<path d="m7 9h2v2h-2z" />
						<path d="m7 13h2v2h-2z" />
						<path d="m10 9h7v2h-7z" />
						<path d="m10 13h7v2h-7z" />
						<path d="m23 18c-.8284 0-1.5-.6716-1.5-1.5v-9c0-.82843.6716-1.5 1.5-1.5z" />
						<path d="m1 6c.82843 0 1.5.67157 1.5 1.5v9c0 .8284-.67157 1.5-1.500001 1.5z" />
					</g>
				</svg>
			),
			title: __( 'Carousel' ),
			onClick: () => setDisplayLayout( { type: 'carousel' } ),
			isActive: displayLayout?.type === 'carousel',
		},
	];

	return (
		<BlockControls group="default">
			<ToolbarGroup
				className="crowdify-toolbar__query-layout"
				controls={ displayLayoutControls }
			/>
		</BlockControls>
	);
};

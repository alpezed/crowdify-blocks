<?php
/**
 * Plugin Name:       Crowdify Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ed Alpez
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       crowdify-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function crowdify_blocks_block_init() {
	register_block_type( __DIR__ . '/build/blocks/icon' );
	register_block_type( __DIR__ . '/build/blocks/slider' );
	register_block_type( __DIR__ . '/build/blocks/slide' );
	register_block_type( __DIR__ . '/build/blocks/filters' );
}
add_action( 'init', 'crowdify_blocks_block_init' );

add_action( 'enqueue_block_editor_assets', 'crowdify_enqueue_block_editor_assets' );
function crowdify_enqueue_block_editor_assets() {
	$variations_file = plugin_dir_path( __FILE__ ) . '/build/variations.asset.php';
	if ( file_exists( $variations_file ) ) {
		$assets = include $variations_file;
		wp_enqueue_script(
			'block-variations',
			plugin_dir_url( __FILE__ ) . '/build/variations.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);
	}
}

function crowdify_block_categories( $categories )
{
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'crowdify',
				'title' => __( 'Crowdify', 'crowdify' ),
			],
		]
	);
}
add_action( 'block_categories', 'crowdify_block_categories', 10, 2 );

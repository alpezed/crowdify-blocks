<?php

/**
 * Fired during plugin activation
 *
 * @link       https://https://alpezed.vercel.app/
 * @since      1.0.0
 *
 * @package    Crowdify_Blocks
 * @subpackage Crowdify_Blocks/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Crowdify_Blocks
 * @subpackage Crowdify_Blocks/includes
 * @author     Ed Alpez <alpezed@gmail.com>
 */
class Crowdify_Blocks_Blocks {
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name ) {

		$this->plugin_name = $plugin_name;

	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 *
	 * @since    1.0.0
	 */
	public function register_block_type() {
		$block_paths = [
			'icon',
			'slider',
			'slide',
			'filters',
			'icon-list',
			'icon-list-item',
			'team'
		];

		foreach ( $block_paths as $path ) {
			register_block_type( plugin_dir_path( dirname( __FILE__ ) ) . 'build/blocks/' . $path );
		}
	}

	/**
	 * Enqueue scripts on block editor
	 *
	 * @since    1.0.0
	 */
	public function enqueue_block_editor_assets() {
		$variations_file = plugin_dir_path( dirname( __FILE__ ) ) . 'build/variations.asset.php';
		if ( file_exists( $variations_file ) ) {
			$assets = include $variations_file;
			wp_enqueue_script( "{$this->plugin_name}-variations", plugin_dir_url( dirname( __FILE__ ) ) . 'build/variations.js', $assets['dependencies'], $assets['version'], true );
			wp_enqueue_style( "{$this->plugin_name}-variations", plugin_dir_url( dirname( __FILE__ ) ) . 'build/style-variations.css', [], $assets['version'] );
		}

		$hooks_file = plugin_dir_path( dirname( __FILE__ ) ) . 'build/hooks.asset.php';
		if ( file_exists( $hooks_file ) ) {
			$assets = include $hooks_file;
			wp_enqueue_script( "{$this->plugin_name}-hooks", plugin_dir_url( dirname( __FILE__ ) ) . 'build/hooks.js', $assets['dependencies'], $assets['version'], true );
		}
	}

	/**
	 * Enqueue scripts on block editor
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		$image_zoom_file = plugin_dir_path( dirname( __FILE__ ) ) . 'build/image-zoom.asset.php';
		if ( file_exists( $image_zoom_file ) ) {
			$assets = include $image_zoom_file;
			wp_enqueue_script( "{$this->plugin_name}-image-zoom", plugin_dir_url( dirname( __FILE__ ) ) . 'build/image-zoom.js', $assets['dependencies'], $assets['version'], true );
			wp_enqueue_style( "{$this->plugin_name}-image-zoom", plugin_dir_url( dirname( __FILE__ ) ) . 'build/style-image-zoom.css', [], $assets['version'] );
		}
	}

	/**
	 * Merges the given array of block categories with the 'Crowdify' category.
	 *
	 * @param array $categories The array of block categories to merge with.
	 * @return array The merged array of block categories.
	 *
	 * @since    1.0.0
	 */
	public function block_categories( $categories ) {
		return array_merge(
			$categories,
			[
				[
					'slug'  => 'crowdify',
					'title' => __( 'Crowdify', 'crowdify-blocks' ),
				],
			]
		);
	}

	/**
	 * Wraps the given block content with a Swiper wrapper if the block is a Crowdify block with a carousel layout.
	 *
	 * @param string $block_content The content of the block.
	 * @param array $block The block data.
	 * @return string The wrapped block content.
	 *
	 * @since    1.0.0
	 */
	public function slider_block_wrapper( $block_content, $block ) {
		/**
		 * Processes the block content to add Swiper classes and attributes.
		 */
		$tag_processor = new WP_HTML_Tag_Processor( $block_content );

		// Check if the block is a Crowdify block with a carousel layout, otherwise return the original content.
		if ( ( isset ( $block['attrs']['crowdify'] ) && $block['attrs']['crowdify']['layout']['type'] !== 'carousel' ) || ! isset ( $block['attrs']['crowdify'] ) ) {
			return $block_content;
		}

		// Swiper attributes.
		$swiper_attr = array(
			'autoplay'   => true,
			'navigation' => true,
			'pagination' => true,
			// 'effect' => $attributes['effect'],
			'speed' => 500,
			'slidesPerView' => 3,
			'spaceBetween' => 30,
		);
		$swiper_attr = htmlspecialchars( wp_json_encode( $swiper_attr ) );

		// Process the UL and LI tags to add Swiper classes.
		while ( $tag_processor->next_tag( array( 'tag_name' => 'UL' ) ) ) {
			$tag_processor->add_class( 'swiper-wrapper' );
			while ( $tag_processor->next_tag( array( 'tag_name' => 'LI' ) ) ) {
				$tag_processor->add_class( 'swiper-slide' );
			}
		}

		// Build the Swiper wrapper.
		$content = '<div class="swiper" data-swiper="' . esc_attr( $swiper_attr ) . '">';
		$content .= $tag_processor->get_updated_html();
		$content .= '</div>';

		return $content;
	}

	/**
	 * Wraps the given block content with a custom class if the block is forced to be full width.
	 *
	 * @param string $block_content The content of the block.
	 * @param array $block The block data.
	 * @return string The updated block content.
	 *
	 * @since    1.0.0
	 */
	public function core_image_block_force_full_width( $content, $block ) {
		$force_full_width = isset( $block['attrs']['isForceFullWidth'] ) ? $block['attrs']['isForceFullWidth'] : false;

		$html = new WP_HTML_Tag_Processor( $content );

		if ( false === stripos( $content, '<img' ) ) {
			return '';
		}

		if ( strpos( $content, 'image-zoom') !== false ) {

			// Perform a lookup for the anchor tag
			$img = array(
				'tag_name' => 'img',
			);

			$image_zoom_url = wp_get_attachment_image_url( $block['attrs']['id'], 'large' );

			$html->next_tag( $img );
			$html->set_attribute( 'data-zoomable', true );

			if ( isset( $image_zoom_url ) ) {
				$html->set_attribute( 'data-zoom-src', $image_zoom_url );
			}

			// Remove srcset, width, and height attributes
			$html->set_attribute( 'srcset', '' );
			$html->set_attribute( 'width', '' );
			$html->set_attribute( 'height', '' );

			return $html->get_updated_html();
		}

		if ( ! $force_full_width ) {
			return $content;
		}

		// Append the custom class to the block.
		if ( $html->next_tag() ) {
			$html->add_class( 'is-force-full-width' );
		}


		$content = $html->get_updated_html();

		return $content;
	}

}

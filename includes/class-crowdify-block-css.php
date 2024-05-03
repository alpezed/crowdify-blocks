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

class Crowdify_Blocks_Block_CSS {

	/**
	 * The breakpoints for responsive CSS generation.
	 *
	 * @var array
	 */
	private $breakpoints;

	public function __construct( $breakpoints ) {
		$this->breakpoints = $breakpoints;
	}

	/**
	 * Generates responsive CSS based on the provided selector and styles.
	 *
	 * @param string $selector The CSS selector to apply the styles to.
	 * @param array  $styles An array of styles to apply.
	 * @return string The generated responsive CSS.
	 */
	public function generate_responsive_css( $selector, $styles ) {
		$css = '';
		foreach ( $this->breakpoints as $breakpoint => $media_query ) {
			$css_values = array_values( $styles );

			$has_css_breakpoint = array_reduce(
				$css_values,
				function ( $has_breakpoint, $obj ) use ( $breakpoint ) {
					return $has_breakpoint || isset( $obj[ $breakpoint ] );
				},
				false
			);

			if ( count( $styles ) > 0 && $has_css_breakpoint ) {
				$css .= "@media {$media_query} {";
				$css .= "{$selector} {";

				foreach ( $styles as $css_property => $property_style ) {
					if ( ! isset( $property_style[ $breakpoint ] ) ) {
						continue;
					}

					if ( ! is_array( $property_style[ $breakpoint ] ) ) {
						$css .= "{$css_property}: {$property_style[$breakpoint]}; ";
					} else {
						foreach ( $property_style[ $breakpoint ] as $sub_property => $sub_value ) {
							$css .= "{$css_property}-{$sub_property}: {$sub_value}; ";
						}
					}
				}

				$css .= '}';
				$css .= '}';
			}
		}

		return $css;
	}
}

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
	private $breakpoints;

	public function __construct( $breakpoints ) {
		$this->breakpoints = $breakpoints;
	}

	public function generate_responsive_css( $selector, $styles ) {
		$css = '';
		foreach ($this->breakpoints as $breakpoint => $mediaQuery) {
			$cssValues = array_values( $styles );
			if (count($styles) > 0 && array_reduce($cssValues, function($hasBreakpoint, $obj) use ($breakpoint) {
				return $hasBreakpoint || isset($obj[$breakpoint]);
			}, false)) {
				$css .= "@media {$mediaQuery} {";
				$css .= "{$selector} {";

				foreach ($styles as $cssProperty => $propertyStyles) {
					if (!isset($propertyStyles[$breakpoint])) {
						continue;
					}

					if (!is_array($propertyStyles[$breakpoint])) {
						$css .= "{$cssProperty}: {$propertyStyles[$breakpoint]}; ";
					} else {
						foreach ($propertyStyles[$breakpoint] as $subProperty => $subValue) {
							$css .= "{$cssProperty}-{$subProperty}: {$subValue}; ";
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

<?php
/**
 * Slider block
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 */

$autoplay   = empty( $attributes['autoplay'] ) ? false : $attributes['autoplay'];
$navigation = empty( $attributes['navigation'] ) ? false : $attributes['navigation'];
$pagination = empty( $attributes['pagination'] ) ? false : $attributes['pagination'];

$swiper_attr = array(
	'autoplay'   => $autoplay,
	'navigation' => $navigation,
	'pagination' => $pagination,
	'effect' => $attributes['effect'],
	'speed' => $attributes['speed'],
	'slidesPerView' => $attributes['slidesPerView'],
	'spaceBetween' => $attributes['spaceBetween'],
);
$swiper_attr = htmlspecialchars( wp_json_encode( $swiper_attr ) );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'swiper',
	)
);
?>

<div <?php echo wp_kses_data( $wrapper_attributes ) . 'data-swiper="' . esc_attr( $swiper_attr ) . '"'; ?>>

	<div class="swiper-wrapper">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>

	<?php if ( $navigation ) : ?>
		<div class="swiper-button-prev">
			<svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
				<path d="M30 20.5L20 30.5M20 30.5L30 40.5M20 30.5H40M19.5 53H40.5C44.7004 53 46.8006 53 48.4049 52.1825C49.8161 51.4635 50.9635 50.3161 51.6825 48.9049C52.5 47.3006 52.5 45.2004 52.5 41V20C52.5 15.7996 52.5 13.6994 51.6825 12.0951C50.9635 10.6839 49.8161 9.5365 48.4049 8.81745C46.8006 8 44.7004 8 40.5 8H19.5C15.2996 8 13.1994 8 11.5951 8.81745C10.1839 9.5365 9.0365 10.6839 8.31745 12.0951C7.5 13.6994 7.5 15.7996 7.5 20V41C7.5 45.2004 7.5 47.3006 8.31745 48.9049C9.0365 50.3161 10.1839 51.4635 11.5951 52.1825C13.1994 53 15.2996 53 19.5 53Z" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</div>
		<div class="swiper-button-next">
			<svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
				<path d="M30 40.5L40 30.5M40 30.5L30 20.5M40 30.5H20M19.5 53H40.5C44.7004 53 46.8006 53 48.4049 52.1825C49.8161 51.4635 50.9635 50.3161 51.6825 48.9049C52.5 47.3006 52.5 45.2004 52.5 41V20C52.5 15.7996 52.5 13.6994 51.6825 12.0951C50.9635 10.6839 49.8161 9.5365 48.4049 8.81745C46.8006 8 44.7004 8 40.5 8H19.5C15.2996 8 13.1994 8 11.5951 8.81745C10.1839 9.5365 9.0365 10.6839 8.31745 12.0951C7.5 13.6994 7.5 15.7996 7.5 20V41C7.5 45.2004 7.5 47.3006 8.31745 48.9049C9.0365 50.3161 10.1839 51.4635 11.5951 52.1825C13.1994 53 15.2996 53 19.5 53Z" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</div>
	<?php endif; ?>

	<?php if ( $pagination ) : ?>
		<div class="swiper-pagination"></div>
	<?php endif; ?>

</div><!-- .swiper -->

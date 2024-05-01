<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/
$counter_number = isset( $attributes['counterNumber'] ) ? (int) $attributes['counterNumber'] : 0;
$start_value = isset( $attributes['startVal'] ) ? (int) $attributes['startVal'] : null;
$suffix = isset( $attributes['suffix'] ) ? $attributes['suffix'] : "";
$prefix = isset( $attributes['prefix'] ) ? $attributes['prefix'] : null;
$duration = isset( $attributes['duration'] ) ? $attributes['duration'] : null;

$counter_attr = array_intersect_key(
	$attributes,
	array_flip( [ 'counterNumber', 'startVal', 'suffix', 'prefix', 'duration' ] )
);
$counter_attr = htmlspecialchars( wp_json_encode( $counter_attr ) );
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'id' => $attributes["uniqueId"] ] ) ) . 'data-counter="' . esc_attr( $counter_attr ) . '"'; ?>>
	<?php echo $counter_number; ?>
</div>

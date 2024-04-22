<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$query = $block->context['query'];

$post_type = $query['postType'];
$post_type = $query['postType'];

$taxonomies = get_object_taxonomies( $post_type );

$items = array();

if ( ! empty( $taxonomies ) && isset( $taxonomies ) ) {
	// Get the terms related to post.
	$terms = get_terms( array(
		'taxonomy' => $taxonomies[0],
		'hide_empty' => false, // set to true if you want to hide empty terms
	) );

	if ( ! empty( $terms ) ) {
		$items[] = "<ul " . get_block_wrapper_attributes() . ">";
		foreach ( $terms as $term ) {
			$items[] = sprintf( '<li><a href="%1$s">%2$s</a></li>',
				esc_url( get_term_link( $term->slug, $taxonomies[0] ) ),
				esc_html( $term->name )
			);
		}
		$items[] = "\n</ul>\n";
	}
}


echo implode( "", $items );
?>

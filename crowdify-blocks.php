<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://https://alpezed.vercel.app/
 * @since             1.0.0
 * @package           Crowdify_Blocks
 *
 * @wordpress-plugin
 * Plugin Name:       Crowdify Blocks: The Ultimate WordPress Block Theme Extension
 * Plugin URI:        https://https://alpezed.vercel.app/
 * Description:       Elevate Your WordPress Theme Transform your Crowdify theme with Crowdify Blocks. Effortlessly create captivating blocks, streamline your workflow, and unleash your creativity with seamless integration.
 * Version:           1.0.0
 * Author:            Ed Alpez
 * Author URI:        https://https://alpezed.vercel.app//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       crowdify-blocks
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CROWDIFY_BLOCKS_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-crowdify-blocks-activator.php
 */
function activate_crowdify_blocks() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-crowdify-blocks-activator.php';
	Crowdify_Blocks_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-crowdify-blocks-deactivator.php
 */
function deactivate_crowdify_blocks() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-crowdify-blocks-deactivator.php';
	Crowdify_Blocks_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_crowdify_blocks' );
register_deactivation_hook( __FILE__, 'deactivate_crowdify_blocks' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-crowdify-blocks.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_crowdify_blocks() {

	$plugin = new Crowdify_Blocks();
	$plugin->run();

}
run_crowdify_blocks();

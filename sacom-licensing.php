<?php

/**
 *
 * Plugin Name: Saber Commerce Licensing
 * Plugin URI: https://saberwp.com/
 * Description: Provides support for issuing license keys associated with Saber Commerce products.
 * Version: 1.0.0
 * Author: SaberWP
 * Author URI: https://saberwp.com/
 * Text Domain: saber-commerce-licensing
 * License: GPL3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 */

namespace SaberCommerce\Extension\Licensing;

define( 'SABER_COMMERCE_LICENSING_PLUGIN_NAME', 'Saber Commerce Licensing' );
define( 'SABER_COMMERCE_LICENSING_VERSION', '1.0.0' );
define( 'SABER_COMMERCE_LICENSING_PATH', plugin_dir_path(__FILE__) );
define( 'SABER_COMMERCE_LICENSING_URL', plugin_dir_url(__FILE__) );
define( 'SABER_COMMERCE_LICENSING_DEV_MODE', false );

class Plugin {

	public function __construct() {

		require( SABER_COMMERCE_LICENSING_PATH . 'components/License/LicenseComponent.php' );
		require( SABER_COMMERCE_LICENSING_PATH . 'components/License/LicenseEditor.php' );

		add_filter( 'sacom_component_list', function( $components ) {

			$componentDefinition = [
				'type'  => 'extension',
				'name'  => 'License',
				'class' => '\SaberCommerce\Extension\Licensing\LicenseComponent'
			];

			$components[] = $componentDefinition;

			return $components;

		});

	}



}

new Plugin();

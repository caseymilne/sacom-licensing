<?php

namespace SaberCommerce\Extension\Licensing\Component\License;

use \SaberCommerce\Template;

class LicenseComponent extends \SaberCommerce\Component {

	public function init() {

		$this->shortcodes();

		add_action('wp_enqueue_scripts', [$this, 'addScripts']);

	}

	public function shortcodes() {}

	public function addScripts() {

		wp_enqueue_script(
			'sacom-login-form-script',
			SABER_COMMERCE_URL . '/components/License/js/login-form.js',
			['jquery', 'wp-util'],
			'1.0.0',
			true
		);

	}

	public function showInMenu() {

		return true;

	}

	public function wpMenuLabel() {

		return 'Licenses';

	}

	public function wpAdminSlug() {

		return 'sacom-license';

	}

	public function adminCallback() {

		print '<sacom-license-editor />';

	}

	public function activation() {

		global $wpdb;
		$charsetCollate = $wpdb->get_charset_collate();
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		/* Install license table */
		$tableName = $wpdb->prefix . 'sacom_license';
		$sql = "CREATE TABLE $tableName (
			id_license mediumint(9) NOT NULL AUTO_INCREMENT,
			wp_user_id mediumint(9) NOT NULL,
			title tinytext NOT NULL,
			PRIMARY KEY (id_license)
		) $charsetCollate;";
		dbDelta( $sql );

	}

}

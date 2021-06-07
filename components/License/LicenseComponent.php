<?php

namespace SaberCommerce\Component\License;

use \SaberCommerce\Template;

class LicenseComponent extends \SaberCommerce\Component {

	public function init() {

		$this->addShortcodes();

		add_action('wp_enqueue_scripts', [$this, 'addScripts']);

	}

	public function addShortcodes() {

		add_shortcode('saber_commerce_license_register', function() {

			$template = new Template();
			$template->path = 'components/License/templates/';
			$template->name = 'register_form';
			return $template->get();

		});

		add_shortcode('saber_commerce_license_login', function() {

			$template = new Template();
			$template->path = 'components/License/templates/';
			$template->name = 'login_form';
			return $template->get();

		});


	}

	public function addScripts() {

		wp_enqueue_script(
			'sacom-login-form-script',
			SABER_COMMERCE_URL . '/components/License/js/login-form.js',
			['jquery', 'wp-util'],
			'1.0.0',
			true
		);

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

		/* Install license user table */
		$tableName = $wpdb->prefix . 'sacom_license_user';
		$sql = "CREATE TABLE $tableName (
			id_license_user mediumint(9) NOT NULL AUTO_INCREMENT,
			id_license mediumint(9) NOT NULL,
			wp_user_id mediumint(9) NOT NULL,
			PRIMARY KEY (id_license_user)
		) $charsetCollate;";
		dbDelta( $sql );

	}



}

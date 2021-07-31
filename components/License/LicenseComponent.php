<?php

namespace SaberCommerce\Extension\Licensing;

use \SaberCommerce\Template;

class LicenseComponent extends \SaberCommerce\Component {

	public function init() {

		$this->shortcodes();

		/* Load editor. */
		add_action( 'admin_enqueue_scripts', function( $adminPage ) {

			// var_dump( $adminPage );

			if( 'saber-commerce_page_sacom-license' === $adminPage ) {

				$editor = new LicenseEditor();
				$editor->enqueueEditorScript();

			}

		});

		$e = new LicenseEditor;
		$e->init();

		$api = new LicenseApi();
		$api->init();

	}

	public function shortcodes() {}

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
		print '<div id="sacom-license-editor"></div>';


	}

	public function activation( $ae ) {

		global $wpdb;
		$charsetCollate = $wpdb->get_charset_collate();
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		/* Install license table */
		$tableName = $wpdb->prefix . 'sacom_license';
		$sql = "CREATE TABLE $tableName (
			id_license mediumint( 9 ) NOT NULL AUTO_INCREMENT,
			title varchar( 255 ) NOT NULL,
			description tinytext NULL,
			product tinytext NULL,
			duration varchar( 128 ) DEFAULT 'year' NOT NULL,
			status varchar( 255 ) DEFAULT 'active' NOT NULL,
			PRIMARY KEY ( id_license )
		) $charsetCollate;";
		dbDelta( $sql );

		/* Install license key table */
		$tableName = $wpdb->prefix . 'sacom_license_key';
		$sql = "CREATE TABLE $tableName (
			id_license_key mediumint( 9 ) NOT NULL AUTO_INCREMENT,
			license_key varchar( 255 ) NOT NULL,
			PRIMARY KEY ( id_license_key )
		) $charsetCollate;";
		dbDelta( $sql );

	}

}

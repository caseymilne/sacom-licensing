<?php

namespace SaberCommerce\Extension\Licensing;

use \SaberCommerce\Template;

class LicenseComponent extends \SaberCommerce\Component {

	public function init() {

		$this->shortcodes();

		/* Load editor. */
		add_action( 'admin_enqueue_scripts', function( $adminPage ) {

			if( 'saber-commerce_page_sacom-license' === $adminPage ) {

				$editor = new LicenseEditor();
				$editor->enqueueEditorScript();

			}

		});

		$e = new LicenseEditor;
		$e->init();

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

	}

	public function activation() {

		global $wpdb;
		$charsetCollate = $wpdb->get_charset_collate();
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		/* Install license table */
		$tableName = $wpdb->prefix . 'sacom_license';
		$sql = "CREATE TABLE $tableName (
			id_license mediumint( 9 ) NOT NULL AUTO_INCREMENT,
			status varchar( 255 ) DEFAULT 'active' NOT NULL,
			PRIMARY KEY ( id_license )
		) $charsetCollate;";
		dbDelta( $sql );

	}

}

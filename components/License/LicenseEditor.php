<?php

namespace SaberCommerce\Extension\Licensing;

class LicenseEditor {

	public function init() {

		add_action( 'wp_ajax_sacom_license_loader', function() {

			$response = new \stdClass();

			$obj = new LicenseModel();
			$response->objects = $obj->fetchAll();

			$response->code = 200;
			wp_send_json_success( $response );

		});

		add_action( 'wp_ajax_sacom_license_save', function() {

			$response = new \stdClass();

			$post  = sanitize_post( $_POST );
			$model = sanitize_post( $post['model'] );

			$obj = new LicenseModel();

			if( isset( $model['licenseId'] )) {
				$obj->licenseId = $model['licenseId'];
			} else {
				$obj->licenseId = 0;
			}

			$obj->title        = $model['title'];
			$response->save    = $obj->save();

			if( $response->save === 0 ) {
				$response->code = 300;
			} else {
				$response->code = 200;
			}

			/* Fetch updated model */
			$model = new LicenseModel();
			$response->model = $model->fetchOne( $obj->licenseId );

			wp_send_json_success( $response );

		});

		add_action( 'wp_ajax_sacom_license_user_save', function() {

			$response = new \stdClass();

			$post = sanitize_post( $_POST );
			$model = $post['model'];

			$obj = new LicenseUserModel();

			if( isset( $model['licenseUserId'] )) {
				$obj->licenseUserId = $model['licenseUserId'];
			} else {
				$obj->licenseUserId = 0;
			}

			$obj->licenseId = $model['licenseId'];
			$response->save = $obj->save();

			if( $response->save === 0 ) {
				$response->code = 300;
			} else {
				$response->code = 200;
			}

			/* Fetch updated model */
			$model = new LicenseUserModel();
			$response->childModel = $model->fetchOne( $obj->licenseUserId );

			$model = new LicenseModel();
			$response->parentModel = $model->fetchOne( $obj->licenseId );

			wp_send_json_success( $response );

		});


		add_action( 'wp_ajax_sacom_license_user_delete', function() {

			$response = new \stdClass();

			$licenseUserId = sanitize_text_field( $_POST['licenseUserId'] );

			$model = new LicenseUserModel();
			$obj   = $model->fetchOne( $licenseUserId );
			$licenseId = $obj->licenseId;
			$response->result = $obj->delete();
			$response->licenseUserId = $licenseUserId;
			$model = new LicenseModel();
			$response->parentModel = $model->fetchOne( $licenseId );

			$response->code = 200;
			wp_send_json_success( $response );

		});


	}

	public function enqueueEditorScript() {

		/* Timesheet Editor styles */
		wp_enqueue_style(
			'sacom-license-editor-styles',
			SABER_COMMERCE_URL . '/components/License/css/license-editor.css',
			[],
			\SaberCommerce\Plugin::getEnqueueVersion(),
			'all'
		);

		wp_enqueue_script(
			'sacom-license-editor',
			SABER_COMMERCE_URL . 'components/License/js/LicenseEditor.js',
			[ 'sacom-editor-base', 'sacom-admin-script', 'wp-util', 'jquery-ui-tooltip', 'jquery-ui-dialog', 'jquery-ui-datepicker', 'sacom-dayjs' ],
			\SaberCommerce\Plugin::getEnqueueVersion(),
			1
		);

		$localizedData = [
			'saberCommerceUrl' => SABER_COMMERCE_URL,
		];
		wp_localize_script(
			'sacom-license-editor',
			'editorData',
			$localizedData
		);

	}

}

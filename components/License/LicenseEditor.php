<?php

namespace SaberCommerce\Extension\Licensing;

use \SaberCommerce\Field;

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
			$obj->description  = $model['description'];
			$obj->product      = $model['product'];
			$obj->duration     = $model['duration'];
			$obj->status       = $model['status'];
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

		add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {

			if ( 'sacom-license-editor' !== $handle ) {
				return $tag;
			}

			// change the script tag by adding type="module" and return it.
			$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
			return $tag;

		}, 10, 3 );

	}

	public function enqueueEditorScript() {

		/* Timesheet Editor styles */
		wp_enqueue_style(
			'sacom-license-editor-styles',
			SABER_COMMERCE_LICENSING_URL . '/components/License/css/license-editor.css',
			[],
			\SaberCommerce\Plugin::getEnqueueVersion(),
			'all'
		);

		wp_enqueue_script(
			'sacom-license-editor',
			SABER_COMMERCE_LICENSING_URL . 'components/License/js/LicenseEditor.js',
			[ 'sacom-editor-base', 'sacom-admin-script', 'wp-util', 'jquery-ui-tooltip', 'jquery-ui-dialog', 'jquery-ui-datepicker', 'sacom-dayjs' ],
			\SaberCommerce\Plugin::getEnqueueVersion(),
			1
		);

		$localizedData = [
			'saberCommerceUrl' => SABER_COMMERCE_URL,
			'fields'           => $this->fields(),
			'strings'          => $this->strings()
		];

		wp_localize_script(
			'sacom-license-editor',
			'editorData',
			$localizedData
		);

	}

	function fields() {

		$fs = [];

		$f              = new Field();
		$f->id          = 'title';
		$f->label       = __( 'Title', 'saber-commerce' );
		$f->placeholder = __( 'Enter a title.', 'saber-commerce' );
		$fs[] = $f;

		$f              = new Field();
		$f->type        = 'textarea';
		$f->id          = 'description';
		$f->label       = __( 'Description', 'saber-commerce' );
		$f->placeholder = __( 'Enter a description.', 'saber-commerce' );
		$fs[] = $f;

		$f              = new Field();
		$f->type        = 'select';
		$f->id          = 'product';
		$f->label       = __( 'Product', 'saber-commerce' );
		$f->placeholder = __( 'Choose a product.', 'saber-commerce' );
		$fs[] = $f;

		$f              = new Field();
		$f->type        = 'toggle';
		$f->id          = 'duration';
		$f->label       = __( 'Duration', 'saber-commerce' );
		$f->placeholder = __( 'Choose duration.', 'saber-commerce' );
		$f->default     = 'year';
		$f->choices = [
			[
				'value' => 'year',
				'label' => __( 'YEAR', 'saber-commerce' )
			],
			[
				'value' => 'lifetime',
				'label' => __( 'LIFETIME', 'saber-commerce' )
			]
		];
		$fs[] = $f;

		$f              = new Field();
		$f->type        = 'text';
		$f->id          = 'status';
		$f->label       = __( 'Status', 'saber-commerce' );
		$f->placeholder = __( 'Choose status.', 'saber-commerce' );
		$fs[] = $f;

		return $fs;

	}

	function strings() {

		return [
			'add_new'             => __( 'Add New', 'saber-commerce' ),
			'view_all'            => __( 'View All', 'saber-commerce' ),
			'dashboard_uppercase' => __( 'DASHBOARD', 'saber-commerce' ),
			'licenses_uppercase'  => __( 'LICENSES', 'saber-commerce' ),
		];

	}

}

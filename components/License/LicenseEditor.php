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

		wp_enqueue_script(
			'sacom-license-editor',
			SABER_COMMERCE_LICENSING_URL . '/build/index.js',
			[ 'wp-element' ],
			\SaberCommerce\Plugin::getEnqueueVersion(),
			1
		);

		$localizedData = [
			'saberCommerceUrl' => SABER_COMMERCE_URL,
			'fields'           => $this->fields(),
			'strings'          => $this->strings(),
			'models'           => $this->models()
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
		$f->type        = 'toggle';
		$f->id          = 'status';
		$f->label       = __( 'Status', 'saber-commerce' );
		$f->placeholder = __( 'Choose status.', 'saber-commerce' );
		$f->default     = 'active';
		$f->choices = [
			[
				'value' => 'active',
				'label' => __( 'ACTIVE', 'saber-commerce' )
			],
			[
				'value' => 'archived',
				'label' => __( 'ARCHIVED', 'saber-commerce' )
			]
		];
		$fs[] = $f;

		return $fs;

	}

	function models() {

		$models = [];

		$m = new LicenseModel();
		$model = new \stdClass;
		$model->definition = $m->definition();
		$model->collection = $m->fetchAll();
		$models[] = $model;

		$m = new LicenseKeyModel();
		$model = new \stdClass;
		$model->definition = $m->definition();
		$model->collection = $m->fetchAll();
		$models[] = $model;

		return $models;

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

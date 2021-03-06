<?php

namespace SaberCommerce\Extension\Licensing;

class LicenseApi extends \WP_REST_Controller {

	public function init() {

		add_action( 'rest_api_init', [ $this, 'registerRoutes' ] );

	}

	public function registerRoutes() {

		register_rest_route( 'sacom/v1', '/license',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [ $this, 'getLicenseCollection' ],
			]
		);

		/* License Key Routes */

		register_rest_route( 'sacom/v1', '/license/key',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [ $this, 'getLicenseKeyCollection' ],
			]
		);

		/* License Create. */
		register_rest_route( 'sacom/v1', '/license',
			[
				'methods' => 'POST',
				'callback' => [ $this, 'createLicense' ],
			]
		);

		register_rest_route( 'sacom/v1', '/license/key',
			[
				'methods' => 'POST',
				'callback' => [ $this, 'createLicenseKey' ],
			]
		);

		register_rest_route( 'sacom/v1', '/license/(?P<id>\d+)',
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [ $this, 'getLicense' ],
				'args' => array(
					'id' => array(
						'validate_callback' => function($param, $request, $key) {
							return is_numeric( $param );
						}
					),
				),
			]
		);



		/* License key verification. */
		register_rest_route( 'sacom/v1', '/license/verify',
			[
				'methods' => 'POST',
				'callback' => [ $this, 'verify' ],
			]
		);

	}

	function verify( $request ) {

		$response = new \stdClass;

		$params = $request->get_params();
		$response->params = $params;

		// Fetch license model.
		$lm = new LicenseModel();
		$license = $lm->fetchOne( $params['license'] );
		$response->license = $license;

		// Verify key.
		$isVerified = $lm->verify( $params['key'] );
		$response->verified = $isVerified;

		return $response;

	}

	public function getLicenseCollection() {

		$m = new LicenseModel();
		$licenses = $m->fetchAll();
		$response = [
			'licenses' => $licenses
		];
		return $response;

	}

	public function getLicense( $request ) {

		$m = new LicenseModel();
		$license = $m->fetchOne( $request['id'] );

		if ( !$license ) {
			return new \WP_Error( 'no_license', 'No license with that license ID.', array( 'status' => 404 ) );
		}

		return $license;

	}

	public function getLicenseKeyCollection() {

		$m = new LicenseKeyModel();
		$keys = $m->fetchAll();
		$response = [
			'license_keys' => $keys
		];
		return $response;

	}

	/* License create callback handler. */
	function createLicense() {

		$response = 1;
		return $response;

	}

	function createLicenseKey() {

		$response = 1;
		return $response;

	}

}

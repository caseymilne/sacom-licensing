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

}

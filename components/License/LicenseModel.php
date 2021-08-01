<?php

namespace SaberCommerce\Extension\Licensing;

use \SaberCommerce\Template;

class LicenseModel extends \SaberCommerce\Model {

	public $licenseId;
	public $title;
	public $description;
	public $product;
	public $duration;
	public $status;
	public $table = 'license';

	public function fetch() {

		global $wpdb;
		$where = '1=1';
		$tss = $wpdb->get_results(
			"SELECT * FROM " .
			$this->tableName() .
			" WHERE $where"
		);

		foreach( $tss as $index => $license ) {

			$tss[ $index ] = $this->load( $license );

		}

		return $tss;

	}

	/* Cart conversion to License. */
	public function makeLicenseFromCart( $cart ) {

		$license = new LicenseModel();
		$license->cart = $cart;

		// Build license from cart model.


		// Build license items from cart items.

		$license->save();
		return $license;

	}

	public function generateLicenseNumber() {



	}

	public function fetchAll() {

		global $wpdb;
		$where = '1=1';
		$results = $wpdb->get_results(
			"SELECT * FROM " .
			$this->tableName() .
			" WHERE $where" .
			" ORDER BY id_license DESC"
		);

		foreach( $results as $index => $row ) {

			$results[ $index ] = $this->load( $row );

		}

		return $results;

	}

	public function fetchLatest() {

		global $wpdb;
		$where = '1=1';
		$results = $wpdb->get_results(
			"SELECT * FROM " .
			$this->tableName() .
			" WHERE $where" .
			" ORDER BY id_license DESC" .
			" LIMIT 5"
		);

		foreach( $results as $index => $row ) {

			$results[ $index ] = $this->load( $row );

		}

		return $results;

	}

	public function fetchCount() {

		global $wpdb;
		$results = $wpdb->get_var(
			"SELECT COUNT(*) FROM " .
			$this->tableName()
		);

		return $results;

	}

	/*
	 * Fetch one license from database
	 */
	public function fetchOne( $licenseId ) {

		$this->licenseId = $licenseId;

		global $wpdb;
		$where = '1=1';
		$where .= " AND id_license = $licenseId";
		$result = $wpdb->get_results(
			"SELECT * FROM " .
			$this->tableName() .
			" WHERE $where" .
			" LIMIT 1"
		);

		if( empty( $result )) {
			return false;
		}

		$row = $result[0];
		$obj = $this->load( $row );
		return $obj;

	}

	/*
	 * Loading function for single licenses
	 */
	public function load( $row ) {

		$license = new LicenseModel();
		$license->licenseId   = $row->id_license;
		$license->title       = $row->title;
		$license->description = $row->description;
		$license->product     = $row->product;
		$license->duration    = $row->duration;
		$license->status      = $row->status;
		return $license;

	}

	public function save() {

		global $wpdb;
		$tableName = $wpdb->prefix . 'sacom_' . $this->table;

		$data = [
			'title'        => $this->title,
			'description'  => $this->description,
			'product'      => $this->product
		];

		if( $this->duration ) {

			$data['duration'] = $this->duration;

		}

		if( $this->status ) {

			$data['status'] = $this->status;

		}

		if( !$this->licenseId ) {

			$result = $wpdb->insert( $tableName, $data );
			$this->licenseId = $wpdb->insert_id;

		} else {

			$result = $wpdb->update( $tableName, $data,
				[ 'id_license' => $this->licenseId ]
			);

		}

		return $result;

	}

	public function delete() {

		if( !$this->licenseId ) {
			return;
		}

		global $wpdb;
		$wpdb->delete( $this->tableName(), [
				'id_license' => $this->licenseId
			]
		);

	}

	/* Test if the current object is valid. */
	public function isValid() {

		return false;

	}

	function tableName() {

		global $wpdb;
		return $wpdb->prefix . 'sacom_' . $this->table;

	}

	function verify( $key ) {

		if( $key === '8736-0293-9345-1293' ) {
			return 1;
		}

		return 0;

	}

	function definition() {

		$def = new \stdClass;
		$def->key = 'license_key';
		$def->fields = $this->fields();
		return $def;

	}

	function fields() {

		$fields = [];

		$f = new \SaberCommerce\Field;
		$f->key = 'id_license';
		$f->propertyKey = 'licenseId';
		$f->label = 'ID';
		$f->tableDisplay = 1;
		$fields[] = $f;

		$f = new \SaberCommerce\Field;
		$f->key = 'title';
		$f->propertyKey = 'title';
		$f->label = 'Title';
		$f->tableDisplay = 1;
		$fields[] = $f;

		$f = new \SaberCommerce\Field;
		$f->type = 'textarea';
		$f->key = 'description';
		$f->propertyKey = 'description';
		$f->label = 'License Description';
		$f->tableDisplay = 0;
		$fields[] = $f;

		$f = new \SaberCommerce\Field;
		$f->type = 'select';
		$f->key = 'product';

		$pm = new \SaberCommerce\Component\Product\ProductModel();
		$products = $pm->fetchAll();
		
		$f->choices = [];
		foreach( $products as $product ) {

			$choice = new \stdClass;
			$choice->label = $product->title;
			$choice->value = $product->productId;
			$f->choices[] = $choice;

		}

		$f->propertyKey = 'product';
		$f->label = 'Product';
		$f->tableDisplay = 1;
		$fields[] = $f;

		return $fields;

	}

}

<?php

namespace SaberCommerce\Extension\Licensing;

class LicenseKeyModel extends \SaberCommerce\Model {

	public $table = 'license_key';

	public function fetchAll() {

		global $wpdb;
		$where = '1=1';
		$results = $wpdb->get_results(
			"SELECT * FROM " .
			$this->tableName() .
			" WHERE $where" .
			" ORDER BY id_license_key DESC"
		);

		foreach( $results as $index => $row ) {

			$results[ $index ] = $this->load( $row );

		}

		return $results;

	}

	/*
	 * Loading method for single license key.
	 */
	public function load( $row ) {

		$m      = new LicenseKeyModel();
		$m->id  = $row->id_license_key;
		$m->key = $row->license_key;

		return $m;

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
		$f->key = 'id_license_key';
		$f->propertyKey = 'licenseKeyId';
		$f->label = 'ID';
		$f->tableDisplay = 1;
		$fields[] = $f;

		$f = new \SaberCommerce\Field;
		$f->key = 'license_key';
		$f->propertyKey = 'licenseKey';
		$f->label = 'Key';
		$f->tableDisplay = 1;
		$fields[] = $f;

		return $fields;

	}

}

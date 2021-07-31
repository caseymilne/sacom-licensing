import apiFetch from '@wordpress/api-fetch';
import ModelFormRender from './ModelFormRender.js';
import { useHistory } from "react-router-dom";

export default function LicenseKeyForm( props ) {

	let history = useHistory();

	// Calculate the current form submit type.
	function _submitType() {

		return 'create';

	}

	// Calculate the current form submit type.
	function _submitType() {

		return 'create';

	}

	// Set the API base path.
	function _apiPathBase() {

		return '/sacom/v1/';

	}

	// Set the API base path.
	function _apiPathFull( endpoint ) {

		return _apiPathBase() + endpoint;

	}

	function fetchData() {


	}

	function refreshTable() {



	}

	function handleSubmit( values ) {

		console.log( 'handling submit... ')
		console.log( values )

		const type = _submitType();

		const req = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}

		if( type === 'create' ) {

			req.path = _apiPathFull( 'license' );
			req.method = 'POST';

		} else {

			req.path = _apiPathFull( 'license' + this.state.editObject.id );
			req.method = 'PUT';

		}

		const reqBody = {}

		props.model.definition.fields.map( function( field ) {

			reqBody[ field.key ] = values[ field.key ];

		});

		req.body = JSON.stringify( reqBody );

		apiFetch( req ).then( ( response ) => {

			fetchData();
			refreshTable();

		});

	}

	function cancel() {

		history.push("/licenses");

	}

	return (
		<div>

			HR9232132

			<ModelFormRender
				show={1}
				submit={handleSubmit}
				cancel={cancel}
				modelDefinition={props.model.definition}
				modelData={props.model.collection}
			/>

		</div>
	)

}

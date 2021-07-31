import apiFetch from '@wordpress/api-fetch';
import ModelFormRender from './ModelFormRender.js';

export default function LicenseKeyForm( props ) {

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
			req.path = _apiPathBase() + 'tax-rate';
			req.method = 'POST';
		} else {
			req.path = _apiPathBase() + 'tax-rate/' + this.state.editObject.id;
			req.method = 'PUT';
		}

		const reqBody = {}

		props.model.definition.fields.map( function( field ) {

			reqBody[ field.key ] = values[ field.key ];

		});

		console.log( reqBody )

		req.body = JSON.stringify( reqBody );

		apiFetch( req ).then( ( response ) => {

			this.fetchData();
			this.refreshTable();

		});

	}

	function cancel() {

	}

	return (
		<div>

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

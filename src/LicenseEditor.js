import Button from '@material-ui/core/Button';
import LicenseTable from './LicenseTable.js';

export default class LicenseEditor extends React.Component {

	constructor( props ) {

		super( props );

	}

	render() {

		console.log( editorData.models )

		return (
			<div class="sacom-license-editor">
				License Editor React
				<LicenseTable
					modelDefinition={editorData.models[0].definition}
					models={editorData.models[0].collection}
				/>
				<Button>Add License</Button>
				<Button>Edit License</Button>
				<Button>Delete License</Button>
				<Button>Add License Key</Button>
				<Button>Edit License Key</Button>
				<Button>Delete License Key</Button>
			</div>
		);

	}

}

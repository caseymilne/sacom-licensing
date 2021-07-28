import Button from '@material-ui/core/Button';

export default class LicenseEditor extends React.Component {

	constructor( props ) {

		super( props );

	}

	render() {

		return (
			<div class="sacom-license-editor">
				License Editor React
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

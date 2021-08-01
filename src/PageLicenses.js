import Button from '@material-ui/core/Button';
import LicenseTable from './LicenseTable.js';
import { useHistory } from "react-router-dom";

export default function PageLicenses() {

	let history = useHistory();

	function handleClickAddLicense() {

		history.push("licenses/add");

	}

	return (
		<React.Fragment>
			<Button onClick={handleClickAddLicense}>Add License</Button>
			<LicenseTable
					modelDefinition={editorData.models[0].definition}
					models={editorData.models[0].collection}
			/>
		</React.Fragment>
	)

}

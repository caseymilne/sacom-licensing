import Button from '@material-ui/core/Button';
import LicenseTable from './LicenseTable.js';
import { useHistory } from "react-router-dom";

export default function PageKeys() {

	let history = useHistory();

	function handleClickAddKey() {

		history.push("/keys/add");

	}

	return (
		<React.Fragment>
			<Button onClick={handleClickAddKey}>Add Key</Button>
			<LicenseTable
					modelDefinition={editorData.models[1].definition}
					models={editorData.models[1].collection}
			/>
		</React.Fragment>
	)

}

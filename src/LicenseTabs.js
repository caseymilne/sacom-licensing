import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function LicenseTabs() {

	const [value, setValue] = React.useState('/licenses');
	let history = useHistory();

	const handleChange = (event, newValue) => {

		history.push( newValue );
		setValue( newValue );

	};

	return (
		<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
			<Tab value="/licenses" label="Manage Licenses" />
			<Tab value="/keys" label="Manage Keys" />
		</Tabs>
	)

}

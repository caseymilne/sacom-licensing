const { useState, useEffect } = wp.element;
import Button from '@material-ui/core/Button';
import LicenseTable from './LicenseTable.js'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";

function PageLicenses() {

	let history = useHistory();

	function handleClick() {

		history.push("/keys");

	}

	return (
		<React.Fragment>
			<Button onClick={handleClick}>Add License</Button>
			<LicenseTable
					modelDefinition={editorData.models[0].definition}
					models={editorData.models[0].collection}
			/>
		</React.Fragment>
	)

}

function PageKeys() {

	return (
		<LicenseTable
				modelDefinition={editorData.models[1].definition}
				models={editorData.models[1].collection}
		/>
	)

}

function LicenseEditor() {

	return (

		<div class="sacom-license-editor">

			<Router basename="/wp-admin/admin.php?page=sacom-license">
				<nav>
					<ul>
						<li>
							<Link to="/licenses">Manage Licenses</Link>
						</li>
						<li>
							<Link to="/keys">Manage Keys</Link>
						</li>
					</ul>
				</nav>
			<Switch>
				<Route exact path="/licenses" component={PageLicenses} />
				<Route exact path="/keys" component={PageKeys} />
				<Redirect to="/licenses" />
			</Switch>
		</Router>
		</div>
	)

}

export default LicenseEditor;

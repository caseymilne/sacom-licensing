const { useState, useEffect } = wp.element;
import Button from '@material-ui/core/Button';
import LicenseTable from './LicenseTable.js'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { HashRouter, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";

import LicenseKeyForm from './LicenseKeyForm.js';

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

	let history = useHistory();

	function handleClickAddKey() {

		history.push("/keys-add");

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

function PageKeyAdd() {

	return (
		<LicenseKeyForm model={editorData.models[1]} />
	)

}

function LicenseEditor() {

	return (

		<div class="sacom-license-editor">

			<HashRouter>
				<nav>
					<ul>
						<li>
							<Link to="licenses">Manage Licenses</Link>
						</li>
						<li>
							<Link to="keys">Manage Keys</Link>
						</li>
					</ul>
				</nav>
			<Switch>
				<Route exact path="/licenses" component={PageLicenses} />
				<Route exact path="/keys" component={PageKeys} />
				<Route exact path="/keys-add" component={PageKeyAdd} />
				<Redirect to="licenses" />
			</Switch>
		</HashRouter>
		</div>
	)

}

export default LicenseEditor;

const { useState, useEffect } = wp.element;
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import LicenseTable from './LicenseTable.js';

import { HashRouter, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import LicenseKeyForm from './LicenseKeyForm.js';
import LicenseTabs from './LicenseTabs.js';
import PageKeys from './PageKeys.js';
import PageKeyAdd from './PageKeyAdd.js';
import PageLicenses from './PageLicenses.js';
import PageLicenseAdd from './PageLicenseAdd.js';
import SaberCommerceLogo from './SaberCommerceLogo.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(( theme ) => ({
	appBarBg: {
		backgroundColor: '#F3F3F3'
	}
}));

function LicenseEditor() {

	const classes = useStyles();

	return (

		<div class="sacom-license-editor">

			<HashRouter>
				<AppBar position="static" color="default" classes={{ colorDefault: classes.appBarBg }}>
					<Toolbar>
						<SaberCommerceLogo />
						<LicenseTabs />
					</Toolbar>
				</AppBar>

				<Switch>

					<Route exact path="/licenses" component={PageLicenses} />
					<Route exact path="/licenses/add" component={PageLicenseAdd} />
					<Route exact path="/keys" component={PageKeys} />
					<Route exact path="/keys/add" component={PageKeyAdd} />

					<Redirect to="/licenses" />

				</Switch>

			</HashRouter>
		</div>
	)

}

export default LicenseEditor;

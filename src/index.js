import LicenseEditor from './LicenseEditor.js';

const { render, useState } = wp.element;

document.addEventListener( "DOMContentLoaded", function( event ) {

	const container = document.getElementById( 'sacom-license-editor' );

	if( container ) {
		render( <LicenseEditor />, container );
	}

});

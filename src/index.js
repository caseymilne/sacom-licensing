import LicenseEditor from './LicenseEditor.js';

const { render, useState } = wp.element;

document.addEventListener( "DOMContentLoaded", function( event ) {

	const container = document.getElementById( 'sacom-license-editor' );

	console.log('container at 9:')
	console.log( container )

	if( container ) {
		render( <LicenseEditor />, container );
	}

});

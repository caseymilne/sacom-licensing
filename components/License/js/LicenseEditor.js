import Editor from '../../../../saber-commerce/js/Editor.js';

class SACOM_LicenseEditor {

	init() {

		this.data = {
			currentObjects: {
				parent: {
					model: false,
					element: false
				},
				child:  {
					model: false,
					element: false
				}
			}
		}

		// Localize fields.
		this.fields = editorData.fields;

		// Build header.
		this.editor = new Editor();
		this.editor.renderPageHeader();
		SACOM_EditorInstance.renderListFilters();
		SACOM_EditorInstance.renderObjectListContainer();
		SACOM_EditorInstance.loadList();

		// Toggle field events.
		this.editor.toggleField.events();

		// Init all events.
		this.eventsInit();

		this.sortingSetup();

	}

	eventsInit() {

		jQuery( '#sacom-button-create' ).on( 'click', function() {

			SACOM_EditorInstance.modeSwitchEdit( 0 );

		});

		this.returnToListEvents();

	}

	modeSwitchEdit( objectId ) {

		SACOM_EditorInstance.clearUx();
		this.editor.renderPageHeader();
		SACOM_EditorInstance.editorGrid();
		SACOM_EditorInstance.overlayCloseButton();
		SACOM_EditorInstance.renderEditForm();

		if( objectId ) {

			let license = SACOM_EditorInstance.getLoadedObjectModel( objectId );

			SACOM_EditorInstance.setCurrentParentObjectModel( license );
			SACOM_EditorInstance.initEditMode();

		} else {

			SACOM_EditorInstance.initCreateMode();

		}

		// Add save handler after UX rendered because it contains change events that may fire when setting up fields.
		SACOM_EditorInstance.parentSaveHandler();

		// Do script or jQuery plugin init.
		// SACOM_EditorInstance.formScriptReinit()

	}

	editorGrid( cols ) {

		const el = document.createElement('div');
		el.id = 'sacom-editor-grid';

		const el2 = document.createElement('div');
		el2.id = 'editor-grid-header';

		const el3 = document.createElement('div');
		el3.id = 'editor-message-container';

		el2.appendChild( el3 );
		el.appendChild( el2 );

		/* Editor grid body. */
		const el4 = document.createElement('div');
		el4.id = 'editor-grid-body';

		if( cols == 1 ) {

			el4.className = 'sacom-editor-grid-single-col';

		}

		el.appendChild( el4 );

		const el5 = document.createElement('div');
		el5.id = 'sacom-editor-column-main';
		el5.className = 'sacom-editor-column-main';
		el4.appendChild( el5 );

		const el6 = document.createElement('div');
		el6.id = 'sacom-editor-column-right';
		el6.className = 'sacom-editor-column-right';
		el4.appendChild( el6 );

		this.rootElement().appendChild( el );

	}

	rootElement() {

		return document.querySelector( this.rootElementName() );

	}

	rootElementName() {

		return 'sacom-license-editor';

	}

	clearUx() {

		this.rootElement().innerHTML = '';

	}

	pageHeader() {

		const el = document.createElement('div');
		el.id = 'sacom-page-header';
		return el;

	}

	logo() {

		const el = document.createElement('div');
		el.id = 'sacom-header-logo';
		el.innerHTML = '<svg width="710" height="144" viewBox="0 0 710 144" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48.6 143.4C39.4 143.4 31.1333 141.8 23.8 138.6C16.6 135.267 10.9333 130.733 6.8 125C2.66667 119.133 0.533334 112.4 0.400001 104.8H19.8C20.4667 111.333 23.1333 116.867 27.8 121.4C32.6 125.8 39.5333 128 48.6 128C57.2667 128 64.0667 125.867 69 121.6C74.0667 117.2 76.6 111.6 76.6 104.8C76.6 99.4667 75.1333 95.1333 72.2 91.8C69.2667 88.4667 65.6 85.9333 61.2 84.2C56.8 82.4667 50.8667 80.6 43.4 78.6C34.2 76.2 26.8 73.8 21.2 71.4C15.7333 69 11 65.2667 7 60.2C3.13333 55 1.2 48.0667 1.2 39.4C1.2 31.8 3.13333 25.0667 7 19.2C10.8667 13.3333 16.2667 8.79999 23.2 5.59999C30.2667 2.39999 38.3333 0.799994 47.4 0.799994C60.4667 0.799994 71.1333 4.06666 79.4 10.6C87.8 17.1333 92.5333 25.8 93.6 36.6H73.6C72.9333 31.2667 70.1333 26.6 65.2 22.6C60.2667 18.4667 53.7333 16.4 45.6 16.4C38 16.4 31.8 18.4 27 22.4C22.2 26.2667 19.8 31.7333 19.8 38.8C19.8 43.8667 21.2 48 24 51.2C26.9333 54.4 30.4667 56.8667 34.6 58.6C38.8667 60.2 44.8 62.0667 52.4 64.2C61.6 66.7333 69 69.2667 74.6 71.8C80.2 74.2 85 78 89 83.2C93 88.2667 95 95.2 95 104C95 110.8 93.2 117.2 89.6 123.2C86 129.2 80.6667 134.067 73.6 137.8C66.5333 141.533 58.2 143.4 48.6 143.4ZM204.183 111H143.383L132.183 142H112.983L163.383 3.4H184.383L234.583 142H215.383L204.183 111ZM198.983 96.2L173.783 25.8L148.583 96.2H198.983Z" fill="#17629E"/><path d="M249.748 72.2C249.748 58.6 252.815 46.4 258.948 35.6C265.082 24.6667 273.415 16.1333 283.948 9.99999C294.615 3.86666 306.415 0.799994 319.348 0.799994C334.548 0.799994 347.815 4.46666 359.148 11.8C370.482 19.1333 378.748 29.5333 383.948 43H362.148C358.282 34.6 352.682 28.1333 345.348 23.6C338.148 19.0667 329.482 16.8 319.348 16.8C309.615 16.8 300.882 19.0667 293.148 23.6C285.415 28.1333 279.348 34.6 274.948 43C270.548 51.2667 268.348 61 268.348 72.2C268.348 83.2667 270.548 93 274.948 101.4C279.348 109.667 285.415 116.067 293.148 120.6C300.882 125.133 309.615 127.4 319.348 127.4C329.482 127.4 338.148 125.2 345.348 120.8C352.682 116.267 358.282 109.8 362.148 101.4H383.948C378.748 114.733 370.482 125.067 359.148 132.4C347.815 139.6 334.548 143.2 319.348 143.2C306.415 143.2 294.615 140.2 283.948 134.2C273.415 128.067 265.082 119.6 258.948 108.8C252.815 98 249.748 85.8 249.748 72.2ZM474.241 143.4C461.307 143.4 449.507 140.4 438.841 134.4C428.174 128.267 419.707 119.8 413.441 109C407.307 98.0667 404.241 85.8 404.241 72.2C404.241 58.6 407.307 46.4 413.441 35.6C419.707 24.6667 428.174 16.2 438.841 10.2C449.507 4.06666 461.307 0.999991 474.241 0.999991C487.307 0.999991 499.174 4.06666 509.841 10.2C520.507 16.2 528.907 24.6 535.041 35.4C541.174 46.2 544.241 58.4667 544.241 72.2C544.241 85.9333 541.174 98.2 535.041 109C528.907 119.8 520.507 128.267 509.841 134.4C499.174 140.4 487.307 143.4 474.241 143.4ZM474.241 127.6C483.974 127.6 492.707 125.333 500.441 120.8C508.307 116.267 514.441 109.8 518.841 101.4C523.374 93 525.641 83.2667 525.641 72.2C525.641 61 523.374 51.2667 518.841 43C514.441 34.6 508.374 28.1333 500.641 23.6C492.907 19.0667 484.107 16.8 474.241 16.8C464.374 16.8 455.574 19.0667 447.841 23.6C440.107 28.1333 433.974 34.6 429.441 43C425.041 51.2667 422.841 61 422.841 72.2C422.841 83.2667 425.041 93 429.441 101.4C433.974 109.8 440.107 116.267 447.841 120.8C455.707 125.333 464.507 127.6 474.241 127.6ZM709.667 3.59999V142H691.467V38.8L645.467 142H632.667L586.467 38.6V142H568.267V3.59999H587.867L639.067 118L690.267 3.59999H709.667Z" fill="#BDBDBD"/></svg>';
		return el;

	}

	createButton() {

		const el = document.createElement('div');
		el.id = 'sacom-button-create';
		const createButton = document.createElement('button');
		createButton.className = 'sacom-button';
		createButton.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="folder-plus" class="svg-inline--fa fa-folder-plus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464,128H272L208,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128ZM359.5,296a16,16,0,0,1-16,16h-64v64a16,16,0,0,1-16,16h-16a16,16,0,0,1-16-16V312h-64a16,16,0,0,1-16-16V280a16,16,0,0,1,16-16h64V200a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64a16,16,0,0,1,16,16Z"></path></svg>';
		createButton.innerHTML += '<span>';
		createButton.innerHTML += 'Add New';
		createButton.innerHTML += '</span>';
		el.appendChild( createButton );
		return el;

	}

	returnButton() {

		const el = document.createElement('div');
		el.id = 'sacom-button-return';
		el.innerHTML = '';
		const button = document.createElement('button');
		button.className = 'sacom-button';
		var buttonHtml = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list" class="svg-inline--fa fa-list fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>';
		buttonHtml += '<span>';
		buttonHtml += 'View All';
		buttonHtml += '</span>';
		button.innerHTML = buttonHtml;
		el.appendChild( button );
		return el;

	}

	subheader() {

		const el = document.createElement('div');
		el.id = 'sacom-page-subheader';
		return el;

	}

	breadcrumbs() {

		const el = document.createElement('div');
		el.className = 'sacom-breadcrumbs';
		el.innerHTML = '<a href="admin.php?page=sacom">';
		el.innerHTML += 'DASHBOARD';
		el.innerHTML += '</a>';
		el.innerHTML += ' / ';
		el.innerHTML += this.pageTitleUppercase();
		el.innerHTML += '</div>';
		return el;

	}

	pageTitleUppercase() {

		return 'LICENSING';

	}

	overlayCloseButton() {

		const el = document.createElement('div');
		el.id='sacom-editor-overlay-close';
		el.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>';
		document.querySelector( '#sacom-editor-grid' ).appendChild( el );

	}

	renderEditForm() {

		const el = document.createElement('div');
		el.id = 'license-editor-form';
		el.className = 'sacom-editor-form-primary';

		this.fields.forEach( function( field, index ) {

			if( field.type === 'toggle' ) {

				var fieldEl = SACOM_EditorInstance.makeToggleField( field );

			} else {

				var fieldEl = SACOM_EditorInstance.makeTextField( field );

			}

			el.appendChild( fieldEl );

		});

		const statEl = document.createElement('div');
		statEl.className = 'sacom-stat stat-license-id';
		const statEl2 = document.createElement('h2');
		const statEl3 = document.createElement('h4');
		statEl3.innerHTML = 'LICENSE ID';
		statEl.appendChild( statEl2 ).appendChild( statEl3 );

		// Add to DOM.
		const parentEl = document.querySelector( '#sacom-editor-column-main' );

		parentEl.appendChild( el );

	}

	makeTextField( field ) {

		var fieldKey = 'field_' + field.id;

		const el = document.createElement('div');
		el.className = 'sacom-form-field';

		var h = '';
		h += '<label for="' + fieldKey + '">' + field.label + '</label>';
		h += '<input id="' + fieldKey + '" placeholder="' + field.placeholder + '" />';
		el.innerHTML = h;

		return el;

	}

	makeToggleField( field ) {

		const el = document.createElement( 'div' );
		el.className = 'sacom-form-field';

		// Add label.
		const labelEl = document.createElement( 'label' );
		labelEl.innerHTML = field.label;
		el.appendChild( labelEl );

		// Make field.
		const toggleEl = this.makeToggleFieldInput( field );
		el.appendChild( toggleEl );

		return el;

	}

	makeToggleFieldInput( field ) {

		const toggle = this.editor.toggleField;

		var options = {
			id: field.id,
			label: field.label,
			value: field.value,
			default: field.default,
			choices: field.choices
		}

		const toggleField = toggle.render( options );
		return toggleField;

	}

	initCreateMode() {

		this.data.currentObjects.parent = {
			model: false
		}

	}

	parentSaveHandler() {

		jQuery( document ).off( 'change.save', '#field_title, #field_description, #field_product, #field_duration, #field_status' );

		jQuery( document ).on( 'change.save', '#field_title, #field_description, #field_product, #field_duration, #field_status', function() {

			SACOM_EditorInstance.parseParentForm();
			SACOM_EditorInstance.parentSaveRequest();

		});

	}

	returnToListEvents() {

		jQuery( document ).on( 'click', '#sacom-editor-overlay-close, #sacom-button-return button', function() {

			SACOM_EditorInstance.clearUx();
			SACOM_EditorInstance.editor.renderPageHeader();
			SACOM_EditorInstance.renderListFilters();
			SACOM_EditorInstance.renderObjectListContainer();
			SACOM_EditorInstance.loadList();

		});

	}

	renderListFilters() {

		// Filters.
		var html = '';

		// Sorting options.
		html += '<div class="sacom-filters">';
		html += '<h3 id="sort-asc" class="active">Newest First</h3>';
		html += '<h3 id="sort-desc">Oldest First</h3>';
		html += '</div>';

		html += '<h3 class="list-section-header"></h3>';

		jQuery( html ).appendTo( this.rootElement() );

	}

	objectListContainer() {

		const el = document.createElement('div');
		el.id = 'sacom-object-list';
		return el;

	}

	renderObjectListContainer() {

		const el = this.objectListContainer();
		this.rootElement().appendChild( el );

	}

	loadList() {

		this.loadListRequest();

		jQuery( document ).off( 'sacom_editor_object_list_loaded sacom_editor_object_list_sorted' );
		jQuery( document ).on( 'sacom_editor_object_list_loaded sacom_editor_object_list_sorted', function() {

			var html = '';

			jQuery.each( SACOM_EditorInstance.objectList, function( index, item ) {

				html += '<div class="sacom-card" data-id="' + item.licenseId + '">';

				// Card Header.
				html += '<div class="sacom-card-header">';
				html += '<h4>License ID ';
				html += item.licenseId;
				html += '</h4>';
				html += '</div>';

				// Card Body.
				html += '<div class="sacom-card-body">';
				html += '<h2>';

				html += '</h2>';
				html += '</div>';

				/* Card footer */
				html += '<div class="sacom-card-footer">';
				html += '<h4>';
				html += 'STATUS: ' + item.status;
				html += '</h4>';
				html += '</div>';

				/* Close card. */
				html += '</div>';

			});

			html += '</div>';

			jQuery( '#sacom-object-list' ).html( html )

			// Edit button click.
			jQuery('.sacom-card').on('click', function() {

				let objectId = jQuery( this ).attr( 'data-id' );
				SACOM_EditorInstance.modeSwitchEdit( objectId );

			});

			// Create new button click.
			jQuery( document ).on( 'click', '#sacom-button-create', function() {

				SACOM_EditorInstance.modeSwitchEdit( 0 );

			});

		});

	}

	loadListRequest() {

		let data = {}
		wp.ajax.post( 'sacom_license_loader', data ).done( function( response ) {

			SACOM_EditorInstance.objectList = response.objects;

			jQuery( document ).trigger({
				type: 'sacom_editor_object_list_loaded'
			});

		});

	}

	parseParentForm() {

		if( SACOM_EditorInstance.data.currentObjects.parent.model === false ) {
			SACOM_EditorInstance.data.currentObjects.parent.model = {}
		}

		SACOM_EditorInstance.data.currentObjects.parent.model.title       = jQuery( '#field_title' ).val();
		SACOM_EditorInstance.data.currentObjects.parent.model.description = jQuery( '#field_description' ).val();
		SACOM_EditorInstance.data.currentObjects.parent.model.product     = jQuery( '#field_product' ).val();
		SACOM_EditorInstance.data.currentObjects.parent.model.duration    = jQuery( '#field_duration' ).val();
		SACOM_EditorInstance.data.currentObjects.parent.model.status      = jQuery( '#field_status' ).val();

	}

	parentSaveRequest() {

		let data = {
			model: SACOM_EditorInstance.data.currentObjects.parent.model
		}
		wp.ajax.post( 'sacom_license_save', data ).done( function( response ) {

			jQuery( document ).trigger({

				type: 'sacom_license_saved',
				response: response

			});

			/* Show response message. */
			if( response.code === 200 ) {

				if( SACOM_EditorInstance.data.mode === 'create' ) {

					SACOM_EditorInstance.data.mode = 'edit';
					//TimesheetEditor.messages.showMessage( 'Timesheet created. Your timesheet was created successfully with ID ' + response.timesheet.timesheetId + '.' );

				} else {

					//TimesheetEditor.messages.showMessage( 'Timesheet saved. Your timesheet was updated successfully.' );

				}

			} else {

				// Show error message (not saved)

			}

			/* Update SACOM_EditorInstance parent data model. */
			SACOM_EditorInstance.data.currentObjects.parent.model = response.model;

			// Update the License ID in case it's not already set.
			jQuery( '#stat-license-id h2' ).html( SACOM_EditorInstance.data.currentObjects.parent.model.licenseId );


		});

	}

	getLoadedObjectModel( objectId ) {

		var objectMatch = false;

		jQuery.each( SACOM_EditorInstance.objectList, function( index, object ) {

			if( object.licenseId == objectId ) {
				objectMatch = object;
				return true;
			}

		});

		return objectMatch;

	}

	setCurrentParentObjectModel( object ) {

		this.data.currentObjects.parent.model = object;

	}

	getCurrentParentObjectModel() {

		return this.data.currentObjects.parent.model;

	}

	initEditMode() {

		let model = SACOM_EditorInstance.getCurrentParentObjectModel();

		if( model.title ) {

			jQuery( '#field_title' ).val( model.title );

		}

		if( model.description ) {

			jQuery( '#field_description' ).val( model.description );

		}

		if( model.product ) {

			jQuery( '#field_product' ).val( model.product );

		}

		if( model.duration ) {

			jQuery( '#field_duration' ).val( model.duration );

		}

		jQuery( '#field_status' ).val( model.status );

		// Update License ID.
		jQuery( '#stat-license-id h2' ).html( model.licenseId );


	}

	/* Sorting Functions */

	sortingSetup() {

		jQuery( document ).on( 'click', '#sort-asc', function() {

			jQuery( '.sacom-filters h3' ).removeClass( 'active' );
			jQuery( this ).addClass( 'active' );
			var sorted = SACOM_EditorInstance.objectList.sort( SACOM_EditorInstance.sortAsc );
			jQuery( document ).trigger({
				type: 'sacom_editor_object_list_sorted'
			});

			jQuery( '.list-section-header' ).html( 'Most Recent' );

		});

		jQuery( document ).on( 'click', '#sort-desc', function() {

			jQuery( '.sacom-filters h3' ).removeClass( 'active' );
			jQuery( this ).addClass( 'active' );
			var sorted = SACOM_EditorInstance.objectList.sort( SACOM_EditorInstance.sortDesc );

			jQuery( document ).trigger({
				type: 'sacom_editor_object_list_sorted'
			});

			jQuery( '.list-section-header' ).html( 'Oldest Licenses' );

		});

	}

	sortAsc( a, b ) {

		return a.orderId > b.orderId ? -1 : 1;

	}

	sortDesc( a, b ) {

		return a.orderId < b.orderId ? -1 : 1;

	}

}

var SACOM_EditorInstance = new SACOM_LicenseEditor();
SACOM_EditorInstance.init();

var contactsModal =  function () {

	var contactsModalPageContent 	= '#contacts-modal-content',
		smsBlasterButton			= '#sms-blast-button';

	function init() {
		initEventListeners();
	}

	function initEventListeners() {
		$(smsBlasterButton).off('click').on('click', blastFriends);
	}

	function getSelectedContacts() {

		var selectedContacts 	= $(contactsModalPageContent).find('fieldset input:checked'),
			contactInfos		= [];

		selectedContacts.each( function() {
			contactInfos.push($(this).data('contactinfo'));
		});

		return contactInfos;
	}

	function blastFriends() {

		// get selected contacts;
		var chosenFriends = getSelectedContacts();
		$(contactsModalPageContent).popup( "close" );
		//summon smsBot and sms blast friends
		smsBot().blastSmses(chosenFriends);
	}
	
	function showModal() {
		init();
		resetContactsList();
		getContacts();
		//open popup
	}


	function resetContactsList() {
		$(contactsModalPageContent).find('fieldset').empty();
	}

	function getContacts() {
		navigator.contactsPhoneNumbers.list( formatContacts );
	}

	function formatContacts( contacts ) {

		var currentRow 	= '',
			contact 	= null;

		var fieldset = $(contactsModalPageContent).find('fieldset');

		for(var i = 0, len = contacts.length; i < len; i++) {
			
			contact 	= contacts[i];
			currentRow  = '<input type="checkbox" id="' + contact.id + '" data-mini="true">' + 
            			  '<label for="' + contact.id + '">'+ contact.displayName + '</label>'

			var jqueryRow = $(currentRow);
			jqueryRow.data('contactinfo', contact);
			jqueryRow.appendTo(fieldset);
		}

		fieldset.find("[type=checkbox]").checkboxradio();
		$(contactsModalPageContent).find("[data-role=controlgroup]").controlgroup("refresh");

		$(contactsModalPageContent).popup( "open" );
	}

	return {

		showModal : showModal
	}
};
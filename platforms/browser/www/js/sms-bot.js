var smsBot = function () {

    var smsSendingMonitor       = '#sms-sending-monitor',
        smsSendingDoneButton    = '#sending-monitor-done-button',
        successMsg              = '<span class="send-success">successful</span>',
        failMsg                 = '<span class="send-failed">failed</span>',
        sentSuccessCtr          = 0,
        sentFailedCtr           = 0;
        


    function blastSmses(chosenContacts, choseResto) {

        resetSmsMonitor();
        attachListeners();

        if(chosenContacts.length > 0 ){

            launchSendingMonitor();

           $.each(chosenContacts, function () {

                var contact = this;
                sms.send(this.phoneNumbers[0].normalizedNumber,
                         composeSmsMessage(this),
                         restoRadarConfig.getDefaultSmsOptions(), // get from config singleton.
                         function() {
                            sendSuccessCallback(contact, chosenContacts.length);
                         }, 
                         function() {
                            sendFailedCallback(contact, chosenContacts.length);
                        });
            });
        }
    }

    function attachListeners() {

        $(document).off('vclick', smsSendingDoneButton).on('vclick', smsSendingDoneButton, function(){
            wreckSendingMonitor();
        });
    }

    function launchSendingMonitor() {
        $(smsSendingMonitor).popup( "open" );
    }

    function wreckSendingMonitor() {
        $(smsSendingMonitor).popup( "close" );
    }

    function updateSendingMonitor(currentContact, sendingStatus, numberOfMsgsBeforeDone) {

        var smsMonitorFieldset = $(smsSendingMonitor).find('fieldset');
        smsMonitorFieldset.append('<p>Sending message to ' + currentContact.displayName + ' : ' + sendingStatus + '.</p>');

        // if done
        if((sentFailedCtr + sentSuccessCtr) === numberOfMsgsBeforeDone){
            smsMonitorFieldset.append('<strong><p>DONE! ' + successMsg + ': ' + sentSuccessCtr + ', ' + failMsg + ': ' + sentFailedCtr +'</span></p></strong>');
            $(smsSendingMonitor).find('.done-button-holder').append('<button class="ui-btn red-btn ui-corner-all" id="sending-monitor-done-button">OK</button>');
        }
    }

    function sendSuccessCallback(currentContact, numberOfMsgsBeforeDone) {
        sentSuccessCtr++;
        updateSendingMonitor(currentContact, successMsg, numberOfMsgsBeforeDone);
    }

    function sendFailedCallback(currentContact, numberOfMsgsBeforeDone) {
        sentFailedCtr++;
        updateSendingMonitor(currentContact, failMsg, numberOfMsgsBeforeDone);
    }

    function resetSmsMonitor() {
        $(smsSendingMonitor).find('fieldset').empty();
        $('#sending-monitor-done-button').remove();
    }

    function composeSmsMessage(friend) {

        var choseResto  = JSON.parse(restoRadarUtils.getFromLocStore('chosenResto'));
        var smsBody     = 'Hi {0}, I am inviting you to accompany me to eat at {1}. Located at {2}. See ya!';

        smsBody = smsBody.replace('{0}', friend.firstName)
                         .replace('{1}', choseResto.name)
                         .replace('{2}', choseResto.location.address);

        return smsBody;
    }

    return {
        blastSmses : blastSmses
    };
};
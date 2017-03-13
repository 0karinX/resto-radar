/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    restoLocator : null,
    // Application Constructor
    initialize: function() {
        this.restoLocator = new restoLocator();
        this.bindEvents(this);

        this.initializeUserInterface();

        if (navigator.userAgent.indexOf("Android") != -1) {
           $.mobile.defaultPageTransition = 'slide';
           $.mobile.defaultDialogTransition = 'none';
        } 
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function(context) {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('detect-geolocation').addEventListener('click', 
            function() {
                context.restoLocator.getListOfNearbyPlacesByGeolocation($('#search-radius').val());
            }, 
        false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },
    initializeUserInterface: function() {
        $('#search-radius').val(restoRadarConfig.getDefaultSearchRadius()); // populate the input with the basic Default Search Radius.
    }
};

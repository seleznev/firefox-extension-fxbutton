/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var FxButton = {
    DEBUG: false,
    firstStart: true,
    
    init: function() {
    },
    
    onClick: function(e) {
        var e = e || window.event;
        if ('object' === typeof e) {
            if (e.button == 1) {
                document.getElementById("cmd_newNavigatorTab").doCommand("cmd_newNavigatorTab");
            }
        }
    },
    
    update: function() {
        // FIXME: This Implementation is not good.
        if (document.documentElement.hasAttribute("privatebrowsingmode")) {
            document.getElementById("fxmenu_privateBrowsing").label = document.getElementById("fxmenu_privateBrowsing").getAttribute("stoplabel");
        }
        else {
            document.getElementById("fxmenu_privateBrowsing").label = document.getElementById("fxmenu_privateBrowsing").getAttribute("startlabel");
        }
        
        if (FxButton.firstStart) {
            FxButton.updateWebDeveloper();
            FxButton.firstStart = false;
        }
    },
    
    updateWebDeveloper: function() {
        FxButton.appmenu_webdev = document.getElementById("appmenu_webDeveloper_popup");
        FxButton.fxmenu_webdev  = document.getElementById("fxmenu_webDeveloper");
        
        var newMenu = FxButton.appmenu_webdev.cloneNode(true);
        FxButton.fxmenu_webdev.appendChild(newMenu);
        
        items = FxButton.fxmenu_webdev.getElementsByTagName('*');
        for (var i=0; i<items.length; i++) {
            items[i].id = items[i].id.replace(/^appmenu/, "fxmenu");
        }
        
        //document.getElementById("fxmenu_webDeveloper_popup").label = document.getElementById("appmenu_webDeveloper_popup").label;
        
    },
    
    
}

window.addEventListener("load", function(e) { FxButton.init(); }, false);

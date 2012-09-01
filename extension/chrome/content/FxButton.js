/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var FxButton = {
    DEBUG: false,
    
    firstStart: true,
    
    init: function() {
        let firstRunPref = "extensions.fxbutton.firstRunDone";
        
        if (!Application.prefs.getValue(firstRunPref)) {
            Application.prefs.setValue(firstRunPref, true);
            FxButton.installButton("nav-bar", "fxbutton");
        }
    },
    
    installButton: function(toolbarId, id, afterId) {
        if (!document.getElementById(id)) {
            var toolbar = document.getElementById(toolbarId);
            
            // If no afterId is given, then append the item to the toolbar
            var before = null;
            if (afterId) {
                let elem = document.getElementById(afterId);
                if (elem && elem.parentNode == toolbar)
                    before = elem.nextElementSibling;
            }
            
            toolbar.insertItem(id, before);
            toolbar.setAttribute("currentset", toolbar.currentSet);
            document.persist(toolbar.id, "currentset");
        }
    },
    
    onClick: function(e) {
        var e = e || window.event;
        if ('object' === typeof e) {
            if (e.button == 1 && e.target.id == "fxbutton") {
                document.getElementById("cmd_newNavigatorTab").doCommand("cmd_newNavigatorTab");
            }
        }
    },
    
    onPopupShowing: function() {
        // FIXME: This implementation is not good.
        // https://developer.mozilla.org/en-US/docs/Supporting_private_browsing_mode
        var fxmenu_pb = document.getElementById("fxbutton_privateBrowsing");
        if (document.documentElement.hasAttribute("privatebrowsingmode"))
            fxmenu_pb.label = fxmenu_pb.getAttribute("stoplabel");
        else
            fxmenu_pb.label = fxmenu_pb.getAttribute("startlabel");
        
        if (FxButton.firstStart) {
            FxButton.updateWebDeveloper();
            FxButton.firstStart = false;
        }
    },
    
    updateWebDeveloper: function() {
        FxButton.appmenu_webdev = document.getElementById("appmenu_webDeveloper_popup");
        FxButton.fxmenu_webdev  = document.getElementById("fxbutton_webDeveloper");
        
        var newMenu = FxButton.appmenu_webdev.cloneNode(true);
        FxButton.fxmenu_webdev.appendChild(newMenu);
        
        var items = FxButton.fxmenu_webdev.getElementsByTagName('*');
        for (var i = 0; i < items.length; i++) {
            items[i].id = "fxbutton" + items[i].id.replace(/^appmenu/, "");
        }
    },
}

window.addEventListener("load", FxButton.init);

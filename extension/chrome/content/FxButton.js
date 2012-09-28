/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var FxButton = {
    DEBUG: false,
    
    init: function() {
        var appmenu = document.getElementById("appmenu-toolbar-button");
        appmenu.setAttribute("removable", true);
        appmenu.classList.add("fxbutton");
        appmenu.addEventListener("click", FxButton.onClick);
    },
    
    onClick: function(e) {
        var e = e || window.event;
        if ('object' === typeof e) {
            if (e.button == 1 && e.target.id == "appmenu-toolbar-button") {
                document.getElementById("cmd_newNavigatorTab").doCommand("cmd_newNavigatorTab");
            }
        }
    },
}

window.addEventListener("load", FxButton.init);

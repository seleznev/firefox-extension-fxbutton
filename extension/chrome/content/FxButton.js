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
        
        var tabsToolbarObserver = new MutationObserver(function(mutations) {
            mutations.forEach(FxButton.updateClass);
        });
        tabsToolbarObserver.observe(document.getElementById("TabsToolbar"), { attributes: true, attributeFilter: ["currentset"] });
        
        FxButton.updateClass(null);
        
        let appmenu_vbox = document.getElementById("appmenuPrimaryPane");
        
        /* New private window */
        var npw_menuitem = document.getElementById("appmenu_newPrivateWindow");
        npw_menuitem.removeAttribute("key");
        
        /* New tab */
        var nt_menuitem = document.getElementById("appmenu_newTab_popup");
        nt_menuitem.removeAttribute("key");
        appmenu_vbox.insertBefore(nt_menuitem, npw_menuitem);
        
        /* New window */
        var nw_menuitem = document.getElementById("appmenu_newNavigator");
        nw_menuitem.removeAttribute("key");
        appmenu_vbox.insertBefore(nw_menuitem, npw_menuitem);
        
        /* Find */
        var find_menuitem = document.getElementById("appmenu_find");
        
        /* Print */
        var print_splitmenu = document.getElementById("appmenu_print");
        var print_menu = FxButton.getMenu(print_splitmenu);
        print_splitmenu.remove();
        appmenu_vbox.insertBefore(print_menu, find_menuitem);
        appmenu_vbox.insertBefore(find_menuitem, print_menu);
        
        /* Web developer */
        var wd_splitmenu = document.getElementById("appmenu_webDeveloper");
        
        /* Bookmarks */
        var bookmarks_splitmenu = document.getElementById("appmenu_bookmarks");
        var bookmarks_menu = FxButton.getMenu(bookmarks_splitmenu);
        bookmarks_splitmenu.remove();
        appmenu_vbox.insertBefore(bookmarks_menu, wd_splitmenu);
        
        /* History */
        var history_splitmenu = document.getElementById("appmenu_history");
        var history_menu = FxButton.getMenu(history_splitmenu);
        history_splitmenu.remove();
        appmenu_vbox.insertBefore(history_menu, wd_splitmenu);
        
        /* Downloads */
        var downloads_menuitem = document.getElementById("appmenu_downloads");
        appmenu_vbox.insertBefore(downloads_menuitem, wd_splitmenu);
        
        /* Addons */
        var addons_menuitem = document.getElementById("appmenu_addons");
        appmenu_vbox.insertBefore(addons_menuitem, wd_splitmenu);
        
        /* Preferences */
        var preferences_menuitem = document.getElementById("appmenu_preferences");
        appmenu_vbox.insertBefore(preferences_menuitem, wd_splitmenu);
        
        /* Fullscreen */
        var fullscreen_menuitem = document.getElementById("appmenu_fullScreen");
        
        /* Web developer */
        var wd_menu = FxButton.getMenu(wd_splitmenu);
        wd_splitmenu.remove();
        appmenu_vbox.insertBefore(wd_menu, fullscreen_menuitem);
        
        /* Quit */
        var quit_menuitem = document.getElementById("appmenu-quit");
        
        /* Help */
        var help_splitmenu = document.getElementById("appmenu_help");
        var help_menu = FxButton.getMenu(help_splitmenu);
        help_splitmenu.remove();
        appmenu_vbox.insertBefore(help_menu, quit_menuitem);
        
        /* Close */
        var close_menu = document.getElementById("menu_close");
        var close_menuitem = document.createElement("menuitem");
        close_menuitem.setAttribute("id", "appmenu_close");
        close_menuitem.setAttribute("class", "menuitem-iconic-tooltip");
        close_menuitem.setAttribute("command", "cmd_close");
        close_menuitem.setAttribute("label", close_menu.getAttribute("label"));
        appmenu_vbox.insertBefore(close_menuitem, quit_menuitem);
        
        /* Separators */
        
        FxButton.insertSeparator(addons_menuitem);
        FxButton.insertSeparator(preferences_menuitem);
        FxButton.insertSeparator(fullscreen_menuitem);
        FxButton.insertSeparator(help_menu);
        FxButton.insertSeparator(close_menuitem);
        
        /* Clean up */
        document.getElementById("appmenu_newTab").remove();
        document.getElementById("appmenu-editmenu").remove();
        document.getElementById("appmenuSecondaryPane").remove();
        document.getElementById("appmenu-quit").remove();
    },
    
    updateClass: function(mutation) {
        var appmenu = document.getElementById("appmenu-toolbar-button");
        var tabsbar = document.getElementById("TabsToolbar");
        
        var currentset = tabsbar.getAttribute("currentset");
        if (!currentset)
            currentset = tabsbar.getAttribute("defaultset");
        
        var re = new RegExp("^appmenu-toolbar-button($|,)");
        
        if (re.test(currentset)) {
            appmenu.classList.remove("toolbarbutton-1");
        }
        else {
            appmenu.classList.add("toolbarbutton-1");
        }
    },
    
    onClick: function(e) {
        var e = e || window.event;
        if ('object' === typeof e) {
            if (e.button == 1 && e.target.id == "appmenu-toolbar-button") {
                document.getElementById("cmd_newNavigatorTab").doCommand("cmd_newNavigatorTab");
            }
        }
    },
    
    insertSeparator: function(element) {
        var menuseparator = document.createElement("menuseparator");
        menuseparator.setAttribute("class", "appmenu-menuseparator");
        element.parentNode.insertBefore(menuseparator, element);
    },
    
    getMenu: function(splitmenu) {
        var menu = document.createElement("menu");
        
        for (var i=0; i < splitmenu.childNodes.length; i++) {
            menu.appendChild(splitmenu.childNodes[i]);
        }
        
        menu.setAttribute("iconic", splitmenu.getAttribute("iconic"));
        menu.setAttribute("label", splitmenu.getAttribute("label"));
        menu.setAttribute("id", splitmenu.getAttribute("id"));
        
        return menu;
    },
}

window.addEventListener("load", FxButton.init);

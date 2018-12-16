import * as _color from 'color';
import { Component, Input, ViewEncapsulation, Injectable, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App, IonicModule } from 'ionic-angular';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const Color = _color;
class IonUniversalNavbar {
    /**
     * @param {?} app
     */
    constructor(app) {
        this.app = app;
        this.options = {
            color: '#00FF00',
            pages: [],
            hide: false,
            sidemenu: { heading: '' },
            tabs: {
                layout: 'icon-top',
                placement: 'bottom',
                selectedIndex: 0
            }
        };
        this.isFirstTabSelect = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.appendStyles();
        this.hideModalOnBack();
    }
    /**
     * @return {?}
     */
    hideModalOnBack() {
        this.app.viewWillEnter.subscribe((view) => {
            /** @type {?} */
            let closeModal = this.lastView && this.lastView.isOverlay;
            if (closeModal)
                this.lastView.dismiss();
            this.lastView = view;
        });
    }
    /**
     * @return {?}
     */
    fixTabSelect() {
        this.tabs.ionChange.subscribe(() => {
            if (!this.isFirstTabSelect)
                return;
            this.isFirstTabSelect = false;
            /** @type {?} */
            let selected = this.tabs.getSelected();
            if (!selected || !selected._views || !(selected._views.length > 0))
                return;
            /** @type {?} */
            let isRoot = selected._views && !(selected._views.length > 1);
            /** @type {?} */
            let isWrongRoot = selected.root !== selected._views[0].id;
            if (isRoot && isWrongRoot)
                selected.setRoot(selected.root);
        });
    }
    /**
     * @return {?}
     */
    isDesktop() {
        return window.innerWidth > 768;
    }
    /**
     * @return {?}
     */
    toggleDrawer() {
        this.scrollLeft = !this.scrollLeft;
    }
    /**
     * @return {?}
     */
    appendStyles() {
        /** @type {?} */
        let stylesElement = document.createElement('style');
        stylesElement.id = 'ion-universal-navbar-colors';
        stylesElement.innerHTML = `ion-navbar[color=primary] .toolbar-background.toolbar-background-md,
        ion-navbar[color=primary] .toolbar-background.toolbar-background-ios,
        ion-universal-navbar [header] {
            ${this.getLinearGradient(this.options.color)}
        }
        
        @media(min-width: 768px) {
            ion-navbar {
                border-left: 1px solid ${this.options.color};
            }

            ion-tabs.tabs .tabbar a.tab-button[aria-selected=true] {
                ${this.getLinearGradient(this.options.color)}
            }
        }
        
        @media(max-width: 768px) {
            ion-tabs.tabs .tabbar a.tab-button[aria-selected=true] .tab-button-icon,
            ion-tabs.tabs .tabbar a.tab-button[aria-selected=true] .tab-button-text {
                color: ${this.options.color};
            }
        }`;
        if (!document.querySelector('#ion-universal-navbar-colors'))
            document.head.appendChild(stylesElement);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getLinearGradient(color) {
        /** @type {?} */
        let gradientBottom = Color(color).rotate(10).hex();
        return `background: ${color};
        /* Old browsers */
        background: -moz-linear-gradient(top, ${color} 0%, ${gradientBottom} 100%);
        /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, ${color}), color-stop(100%, ${gradientBottom}));
        /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top, ${color} 0%, ${gradientBottom} 100%);
        /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top, ${color} 0%, ${gradientBottom} 100%);
        /* Opera 11.10+ */
        background: -ms-linear-gradient(top, ${color} 0%, ${gradientBottom} 100%);
        /* IE10+ */
        background: linear-gradient(to bottom, ${color} 0%, ${gradientBottom} 100%);
        /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='${color}', endColorstr='${gradientBottom}', GradientType=0);
        /* IE6-9 */`;
    }
}
IonUniversalNavbar.decorators = [
    { type: Component, args: [{
                selector: 'ion-universal-navbar',
                template: "<nav [ngClass]=\"{ 'drawer': isDesktop(), 'scroll-left': scrollLeft}\">\n    <section (click)=\"toggleDrawer()\" header text-center *ngIf=\"isDesktop()\">\n        <span title> {{options.sidemenu.heading}} </span>\n    </section>\n    <ion-tabs name=\"ion-universal-tabs\" id=\"ion-universal-tabs\" tabsHighlight=\"tabsHighlight\" [tabsLayout]=\"options.tabs.layout\"\n        [tabsPlacement]=\"options.tabs.placement\" [selectedIndex]=\"options.tabs.selectedIndex\" #tabs [attr.hide]=\"options.hide\">\n        <ion-tab *ngFor=\"let tab of options.pages\" [root]=\"tab.getRoot()\" [rootParams]=\"tab.getRootParams()\" [tabTitle]=\"tab.getTitle()\"\n            [tabUrlPath]=\"tab.getUrlPath()\" [tabIcon]=\"tab.getIcon()\" [tabBadge]=\"tab.getBadge()\" [show]=\"tab.canShow()\">\n        </ion-tab>\n    </ion-tabs>\n</nav>",
                encapsulation: ViewEncapsulation.None,
                styles: ["ion-universal-navbar ion-tabs.tabs ion-tab .ion-page ion-content.content .scroll-content{margin-bottom:0!important}ion-universal-navbar .disable-navigation .tabbar *{pointer-events:none;opacity:.5}@media (min-width:768px){ion-universal-navbar{height:auto;display:block;z-index:100}ion-universal-navbar .drawer{width:100vw;height:100vw}ion-universal-navbar .drawer [header]{height:calc(56px - 0px);width:calc(280px);font-size:16px;font-weight:400;color:#fff;padding-top:16px;border:none;cursor:pointer;position:absolute;z-index:999999;margin-bottom:-2px;margin-right:-2px;box-shadow:1px 1px 5px rgba(0,0,0,.2)}ion-universal-navbar .drawer [header] ion-icon{vertical-align:middle;font-size:20px;margin-left:5px}ion-universal-navbar .drawer [footer]{position:fixed;bottom:20px;max-width:280px}ion-universal-navbar .drawer [footer] [footer-text]{color:#efefef;width:280px;text-align:center}ion-universal-navbar ion-tabs.tabs ion-tab{left:calc(0px + 280px);max-width:calc(100vw - 280px);background-color:#fff}ion-universal-navbar ion-tabs.tabs ion-tab .scroll-content{margin-bottom:0}ion-universal-navbar ion-tabs.tabs ion-tab ion-title{text-align:center}ion-universal-navbar ion-tabs.tabs .tabbar.show-tabbar{display:block;max-width:280px;position:relative;top:56px;box-shadow:1px 2px 4px rgba(0,0,0,.4);height:100vh;background-color:#fff;border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding:10px}ion-universal-navbar ion-tabs.tabs .tabbar.show-tabbar *{transition-property:all;transition-duration:.25s}ion-universal-navbar ion-tabs.tabs a.tab-button{text-align:left;display:block;padding:5px 10px 10px;max-width:999px;border-radius:30px;background:#fff;margin-bottom:10px}ion-universal-navbar ion-tabs.tabs a.tab-button .tab-button-icon,ion-universal-navbar ion-tabs.tabs a.tab-button .tab-button-text{vertical-align:middle;color:#888;display:inline-block;margin-left:10px}ion-universal-navbar ion-tabs.tabs a.tab-button .tab-button-icon:before{font-size:27px}ion-universal-navbar ion-tabs.tabs a.tab-button .tab-button-text{padding:10px 10px 10px 0}ion-universal-navbar ion-tabs.tabs a.tab-button .tab-badge{left:32px;top:12px;padding-top:2px}ion-universal-navbar ion-tabs.tabs a.tab-button[aria-selected=true]{padding:5px 10px 10px;font-weight:700;box-shadow:0 0 4px rgba(0,0,0,.4)}ion-universal-navbar ion-tabs.tabs a.tab-button[aria-selected=true] ion-icon.tab-button-icon,ion-universal-navbar ion-tabs.tabs a.tab-button[aria-selected=true] span.tab-button-text{-webkit-transform:none;transform:none;color:#fff}ion-universal-navbar ion-tabs.tabs a.tab-button:hover,ion-universal-navbar ion-tabs.tabs a.tab-button[aria-selected=true]{padding-left:75px;opacity:1}ion-universal-navbar ion-tabs.tabs a.tab-button:hover .tab-badge,ion-universal-navbar ion-tabs.tabs a.tab-button[aria-selected=true] .tab-badge{margin-left:66px}ion-universal-navbar ion-tabs.tabs a.tab-button.tab-hidden{display:none}}@media (max-width:768px){ion-universal-navbar ion-tabs .tabbar{transition-property:all;transition-duration:.35s}ion-universal-navbar ion-tabs .tabbar .tab-button .tab-button-text{display:none}ion-universal-navbar ion-tabs .tabbar .tab-button .tab-button-icon{color:rgba(0,0,0,.4)}ion-universal-navbar ion-tabs .tabbar .tab-button .tab-button-icon:before{font-size:30px}ion-universal-navbar ion-tabs .tabbar .tab-badge{padding-top:3px;margin-top:16px;margin-right:16px}ion-universal-navbar ion-tabs[hide=true] .tabbar{margin-bottom:-100%}ion-universal-navbar ion-tabs[hide=true] ion-tab .fixed-content,ion-universal-navbar ion-tabs[hide=true] ion-tab .scroll-content{margin-bottom:0}}"]
            }] },
    { type: Injectable }
];
/** @nocollapse */
IonUniversalNavbar.ctorParameters = () => [
    { type: App }
];
IonUniversalNavbar.propDecorators = {
    options: [{ type: Input, args: ['options',] }],
    tabs: [{ type: ViewChild, args: ['tabs',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IonUniversalNavbarModule {
}
IonUniversalNavbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IonicModule],
                declarations: [IonUniversalNavbar],
                exports: [IonUniversalNavbar]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { IonUniversalNavbar, IonUniversalNavbarModule };

//# sourceMappingURL=ion-universal-navbar.js.map
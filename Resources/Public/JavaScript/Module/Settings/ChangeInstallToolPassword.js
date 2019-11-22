/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __awaiter=this&&this.__awaiter||function(t,e,s,a){return new(s||(s=Promise))((function(n,o){function r(t){try{i(a.next(t))}catch(t){o(t)}}function l(t){try{i(a.throw(t))}catch(t){o(t)}}function i(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,l)}i((a=a.apply(t,e||[])).next())}))};define(["require","exports","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Core/Ajax/AjaxRequest","../../Router","../PasswordStrength","../AbstractInteractableModule"],(function(t,e,s,a,n,o,r,l){"use strict";class i extends l.AbstractInteractableModule{constructor(){super(...arguments),this.selectorChangeButton=".t3js-changeInstallToolPassword-change"}initialize(t){this.currentModal=t,this.getData(),t.on("click",this.selectorChangeButton,t=>{t.preventDefault(),this.change()}),t.on("click",".t3-install-form-password-strength",()=>{r.initialize(".t3-install-form-password-strength")})}getData(){const t=this.getModalBody();new n(o.getUrl("changeInstallToolPasswordGetData")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){const n=yield e.resolve();!0===n.success?(t.empty().append(n.html),s.setButtons(n.buttons)):a.error("Something went wrong")})),e=>{o.handleAjaxError(e,t)})}change(){const t=this.getModalBody(),e=this.getModuleContent().data("install-tool-token");new n(o.getUrl()).post({install:{action:"changeInstallToolPassword",token:e,password:this.findInModal(".t3js-changeInstallToolPassword-password").val(),passwordCheck:this.findInModal(".t3js-changeInstallToolPassword-password-check").val()}}).then(t=>__awaiter(this,void 0,void 0,(function*(){const e=yield t.resolve();!0===e.success&&Array.isArray(e.status)?e.status.forEach(t=>{a.showMessage("",t.message,t.severity)}):a.error("Something went wrong")})),e=>{o.handleAjaxError(e,t)}).finally(()=>{this.findInModal(".t3js-changeInstallToolPassword-password,.t3js-changeInstallToolPassword-password-check").val("")})}}return new i}));
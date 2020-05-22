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
define(["require","exports","jquery","../AbstractInteractableModule","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Core/Ajax/AjaxRequest","../../Router","bootstrap"],(function(e,t,s,n,i,r,o,a){"use strict";class c extends n.AbstractInteractableModule{constructor(){super(...arguments),this.selectorWriteTrigger=".t3js-systemMaintainer-write",this.selectorChosenContainer=".t3js-systemMaintainer-chosen",this.selectorChosenField=".t3js-systemMaintainer-chosen-select"}initialize(t){this.currentModal=t,window.location!==window.parent.location?top.require(["TYPO3/CMS/Install/chosen.jquery.min"],()=>{this.getList()}):e(["TYPO3/CMS/Install/chosen.jquery.min"],()=>{this.getList()}),t.on("click",this.selectorWriteTrigger,e=>{e.preventDefault(),this.write()})}getList(){const e=this.getModalBody();new o(a.getUrl("systemMaintainerGetList")).get({cache:"no-cache"}).then(async t=>{const n=await t.resolve();if(!0===n.success){e.html(n.html),i.setButtons(n.buttons),Array.isArray(n.users)&&n.users.forEach(t=>{let n=t.username;t.disable&&(n="[DISABLED] "+n);const i=s("<option>",{value:t.uid}).text(n);t.isSystemMaintainer&&i.attr("selected","selected"),e.find(this.selectorChosenField).append(i)});const t={".t3js-systemMaintainer-chosen-select":{width:"100%",placeholder_text_multiple:"users"}};for(const s in t)t.hasOwnProperty(s)&&e.find(s).chosen(t[s]);e.find(this.selectorChosenContainer).show(),e.find(this.selectorChosenField).trigger("chosen:updated")}},t=>{a.handleAjaxError(t,e)})}write(){this.setModalButtonsState(!1);const e=this.getModalBody(),t=this.getModuleContent().data("system-maintainer-write-token"),s=this.findInModal(this.selectorChosenField).val();new o(a.getUrl()).post({install:{users:s,token:t,action:"systemMaintainerWrite"}}).then(async e=>{const t=await e.resolve();!0===t.success?Array.isArray(t.status)&&t.status.forEach(e=>{r.success(e.title,e.message)}):r.error("Something went wrong","The request was not processed successfully. Please check the browser's console and TYPO3's log.")},t=>{a.handleAjaxError(t,e)}).finally(()=>{this.setModalButtonsState(!0)})}}return new c}));
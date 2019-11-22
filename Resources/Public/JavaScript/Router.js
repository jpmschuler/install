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
var __awaiter=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,a){function s(e){try{r(n.next(e))}catch(e){a(e)}}function l(e){try{r(n.throw(e))}catch(e){a(e)}}function r(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}r((n=n.apply(e,t||[])).next())}))};define(["require","exports","jquery","TYPO3/CMS/Core/Ajax/AjaxRequest","TYPO3/CMS/Backend/Icons","TYPO3/CMS/Backend/Modal","./Renderable/InfoBox","./Renderable/ProgressBar","./Renderable/Severity"],(function(e,t,o,n,i,a,s,l,r){"use strict";return new class{constructor(){this.selectorBody=".t3js-body",this.selectorMainContent=".t3js-module-body"}initialize(){this.registerInstallToolRoutes(),o(document).on("click",".t3js-login-lockInstallTool",e=>{e.preventDefault(),this.logout()}),o(document).on("click",".t3js-login-login",e=>{e.preventDefault(),this.login()}),o(document).on("keydown","#t3-install-form-password",e=>{13===e.keyCode&&(e.preventDefault(),o(".t3js-login-login").click())}),o(document).on("click",".card .btn",t=>{t.preventDefault();const n=o(t.currentTarget),s=n.data("require"),l=n.data("inline");if(void 0!==l&&1===parseInt(l,10))e([s],e=>{e.initialize(n)});else{const t=n.closest(".card").find(".card-title").html(),l=n.data("modalSize")||a.sizes.large;i.getIcon("spinner-circle",i.sizes.default,null,null,i.markupIdentifiers.inline).then(n=>{const i={type:a.types.default,title:t,size:l,content:o('<div class="modal-loading">').append(n),additionalCssClasses:["install-tool-modal"],callback:t=>{e([s],e=>{e.initialize(t)})}};a.advanced(i)})}}),"backend"===o(this.selectorBody).data("context")?this.executeSilentConfigurationUpdate():this.preAccessCheck()}registerInstallToolRoutes(){void 0===TYPO3.settings&&(TYPO3.settings={ajaxUrls:{icons:"?install[controller]=icon&install[action]=getIcon",icons_cache:"?install[controller]=icon&install[action]=getCacheIdentifier"}})}getUrl(e,t){const n=o(this.selectorBody).data("context");let i=location.href;return i=i.replace(location.search,""),void 0===t&&(t=o(this.selectorBody).data("controller")),i=i+"?install[controller]="+t,void 0!==n&&""!==n&&(i=i+"&install[context]="+n),void 0!==e&&(i=i+"&install[action]="+e),i}executeSilentConfigurationUpdate(){this.updateLoadingInfo("Checking session and executing silent configuration update"),new n(this.getUrl("executeSilentConfigurationUpdate","layout")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){!0===(yield e.resolve()).success?this.executeSilentExtensionConfigurationSynchronization():this.executeSilentConfigurationUpdate()})),e=>{this.handleAjaxError(e)})}executeSilentExtensionConfigurationSynchronization(){const e=o(this.selectorBody);this.updateLoadingInfo("Executing silent extension configuration synchronization"),new n(this.getUrl("executeSilentExtensionConfigurationSynchronization","layout")).get({cache:"no-cache"}).then(t=>__awaiter(this,void 0,void 0,(function*(){if(!0===(yield t.resolve()).success)this.loadMainLayout();else{const t=s.render(r.error,"Something went wrong","");e.empty().append(t)}})),e=>{this.handleAjaxError(e)})}loadMainLayout(){const e=o(this.selectorBody);this.updateLoadingInfo("Loading main layout"),new n(this.getUrl("mainLayout","layout")).get({cache:"no-cache"}).then(t=>__awaiter(this,void 0,void 0,(function*(){const n=yield t.resolve();if(!0===n.success&&"undefined"!==n.html&&n.html.length>0){if(e.empty().append(n.html),"backend"!==o(this.selectorBody).data("context")){const t=e.data("controller");e.find('.t3js-mainmodule[data-controller="'+t+'"]').addClass("active")}this.loadCards()}else{const t=s.render(r.error,"Something went wrong","");e.empty().append(t)}})),e=>{this.handleAjaxError(e)})}handleAjaxError(e,t){return __awaiter(this,void 0,void 0,(function*(){let n;if(403===e.response.status){"backend"===o(this.selectorBody).data("context")?(n=s.render(r.error,"The install tool session expired. Please reload the backend and try again."),o(this.selectorBody).empty().append(n)):this.checkEnableInstallToolFile()}else{const i=this.getUrl(void 0,"upgrade");n=o('<div class="t3js-infobox callout callout-sm callout-danger"><div class="callout-body"><p>Something went wrong. Please use <b><a href="'+i+'">Check for broken extensions</a></b> to see if a loaded extension breaks this part of the install tool and unload it.</p><p>The box below may additionally reveal further details on what went wrong depending on your debug settings. It may help to temporarily switch to debug mode using <b>Settings > Configuration Presets > Debug settings.</b></p><p>If this error happens at an early state and no full exception back trace is shown, it may also help to manually increase debugging output in <code>typo3conf/LocalConfiguration.php</code>:<code>[\'BE\'][\'debug\'] => true</code>, <code>[\'SYS\'][\'devIPmask\'] => \'*\'</code>, <code>[\'SYS\'][\'displayErrors\'] => 1</code>,<code>[\'SYS\'][\'systemLogLevel\'] => 0</code>, <code>[\'SYS\'][\'exceptionalErrors\'] => 12290</code></p></div></div><div class="panel-group" role="tablist" aria-multiselectable="true"><div class="panel panel-default panel-flat searchhit"><div class="panel-heading" role="tab" id="heading-error"><h3 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-error" aria-expanded="true" aria-controls="collapse-error" class="collapsed"><span class="caret"></span><strong>Ajax error</strong></a></h3></div><div id="collapse-error" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-error"><div class="panel-body">'+(yield e.response.text())+"</div></div></div></div>"),void 0!==t?o(t).empty().html(n):o(this.selectorBody).empty().html(n)}}))}checkEnableInstallToolFile(){new n(this.getUrl("checkEnableInstallToolFile")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){!0===(yield e.resolve()).success?this.checkLogin():this.showEnableInstallTool()})),e=>{this.handleAjaxError(e)})}showEnableInstallTool(){new n(this.getUrl("showEnableInstallToolFile")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){const t=yield e.resolve();!0===t.success&&o(this.selectorBody).empty().append(t.html)})),e=>{this.handleAjaxError(e)})}checkLogin(){new n(this.getUrl("checkLogin")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){!0===(yield e.resolve()).success?this.loadMainLayout():this.showLogin()})),e=>{this.handleAjaxError(e)})}showLogin(){new n(this.getUrl("showLogin")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){const t=yield e.resolve();!0===t.success&&o(this.selectorBody).empty().append(t.html)})),e=>{this.handleAjaxError(e)})}login(){const e=o(".t3js-login-output"),t=l.render(r.loading,"Loading...","");e.empty().html(t),new n(this.getUrl()).post({install:{action:"login",token:o("[data-login-token]").data("login-token"),password:o(".t3-install-form-input-text").val()}}).then(t=>__awaiter(this,void 0,void 0,(function*(){const o=yield t.resolve();!0===o.success?this.executeSilentConfigurationUpdate():o.status.forEach(t=>{const o=s.render(t.severity,t.title,t.message);e.empty().html(o)})})),e=>{this.handleAjaxError(e)})}logout(){new n(this.getUrl("logout")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){!0===(yield e.resolve()).success&&this.showEnableInstallTool()})),e=>{this.handleAjaxError(e)})}loadCards(){const e=o(this.selectorMainContent);new n(this.getUrl("cards")).get({cache:"no-cache"}).then(t=>__awaiter(this,void 0,void 0,(function*(){const o=yield t.resolve();if(!0===o.success&&"undefined"!==o.html&&o.html.length>0)e.empty().append(o.html);else{const t=s.render(r.error,"Something went wrong","");e.empty().append(t)}})),e=>{this.handleAjaxError(e)})}updateLoadingInfo(e){o(this.selectorBody).find("#t3js-ui-block-detail").text(e)}preAccessCheck(){this.updateLoadingInfo("Execute pre access check"),new n(this.getUrl("preAccessCheck","layout")).get({cache:"no-cache"}).then(e=>__awaiter(this,void 0,void 0,(function*(){const t=yield e.resolve();t.installToolLocked?this.checkEnableInstallToolFile():t.isAuthorized?this.executeSilentConfigurationUpdate():this.showLogin()})),e=>{this.handleAjaxError(e)})}}}));
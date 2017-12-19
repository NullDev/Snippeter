"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var noop = () => {};

chrome.extension.sendMessage({}, function(response) { noop(); });

var snip = ".snippet";
$(document).ready(function(){
    var elm = $(snip).length;
    $(snip).each(function(i, obj) {
        var btnElement = '<button class="nl--export--btn" type="button"><span class="icon-play-white _hover"></span> Export to JSFiddle</button>';
        $(obj).find(".snippet-ctas").find(".popout-code").before(btnElement);
    });

    $(".nl--export--btn").off().on("click", function(){
        var js   = null,
            css  = null,
            html = null;

        var jsTmp = $(this).closest(".snippet-code").find(".snippet-code-js");
        if ($(jsTmp).length){
            js = $(jsTmp).find("code").html();
            js = js.replace(/<(?:.|\n)*?>/gm, "");
            js = convertHTMLEntity(js);
        }

        var cssTmp = $(this).closest(".snippet-code").find(".snippet-code-css");
        if ($(cssTmp).length){
            css = $(cssTmp).find("code").html();
            css = css.replace(/<(?:.|\n)*?>/gm, "");
            css = convertHTMLEntity(css);
        }

        var htmlTmp = $(this).closest(".snippet-code").find(".snippet-code-html");
        if ($(htmlTmp).length){
            html = $(htmlTmp).find("code").html();
            html = html.replace(/<(?:.|\n)*?>/gm, "");
            html = convertHTMLEntity(html);
        }

        chrome.runtime.sendMessage({ type: "url", options: { js: js, css: css, html: html }});        
    });

    storage.set({ count: elm });
});

function convertHTMLEntity(text){
    var span = document.createElement("span");
    return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
        span.innerHTML = entity;
        return span.innerText;
    });
}

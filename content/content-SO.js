"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var noop = () => {};

chrome.extension.sendMessage({}, function(response){ noop(); });

var snip = ".snippet";
var prec = "pre.prettyprinted";

$(document).ajaxSuccess(function(event, xhr, settings){ createElement(); });

$(document).ready(function(){
    var elm = $(snip).length;
    createElement(function(){
        $(".nl--export--btn").off().on("click", function(){
            var js   = null,
                css  = null,
                html = null;

            var jsTmp   = $(this).closest(".snippet-code").find(".snippet-code-js");
            var cssTmp  = $(this).closest(".snippet-code").find(".snippet-code-css");
            var htmlTmp = $(this).closest(".snippet-code").find(".snippet-code-html");

            if ($(jsTmp).length)   js   = convertHTMLEntity($(jsTmp  ).find("code").html().replace(/<(?:.|\n)*?>/gm, ""));
            if ($(cssTmp).length)  css  = convertHTMLEntity($(cssTmp ).find("code").html().replace(/<(?:.|\n)*?>/gm, ""));
            if ($(htmlTmp).length) html = convertHTMLEntity($(htmlTmp).find("code").html().replace(/<(?:.|\n)*?>/gm, ""));

            chrome.runtime.sendMessage({ type: "url", options: { js: js, css: css, html: html }});        
        });   

        $(".nl--exporter--btn--trigger").off().on("click", function(){
            var type = $(this).attr("id");
            var codeStr = $(this).parents().eq(4).next().first().html().replace(/<(?:.|\n)*?>/gm, "");
            codeStr = convertHTMLEntity(codeStr);
            switch(type.toLowerCase()){
                case "nl--exporter--btn--js": {
                    chrome.runtime.sendMessage({ type: "url", options: { js: codeStr }}); 
                    break;
                }
                case "nl--exporter--btn--css": {
                    chrome.runtime.sendMessage({ type: "url", options: { css: codeStr }}); 
                    break;
                }
                case "nl--exporter--btn--html": {
                    chrome.runtime.sendMessage({ type: "url", options: { html: codeStr }}); 
                    break;
                }
                case "nl--exporter--btn--none": 
                default: {
                    noop();
                    break;
                }
            }
        });
    });
    storage.set({ count: elm });
});

function createElement(callback){
    var cont = false;
    $(snip).each(function(i, obj){
        var btnElement = '<button class="nl--export--btn" type="button"><span class="icon-play-white _hover"></span> Export to JSFiddle</button>';
        $(obj).find(".snippet-ctas").find(".popout-code").before(btnElement);
    });
    storage.get("nstate", function(i){ 
        if (i.nstate){
            $(prec).each(function(i, obj){
                if (!$(obj).closest(".snippet").length){
                    var btnElement = '<div class="nl--exporter--menu"><nav><ul><li><span class="nl--exporter--btn"></span><ul class="nl--exporter--inner"><li class="nl--exporter--btn--trigger" id="nl--exporter--btn--js"><a>JS</a></li><li class="nl--exporter--btn--trigger" id="nl--exporter--btn--html"><a>HTML</a></li><li class="nl--exporter--btn--trigger" id="nl--exporter--btn--css"><a>CSS</a></li><li class="nl--exporter--btn--trigger" id="nl--exporter--btn--none"><a href="http://jsfiddle.net" target="_blank">NONE</a></li></ul></li></ul></nav></div>'; 
                    $(obj).before(btnElement);
                }
                cont = true;
            });
        }
        else cont = true;
    });
    var checkr = setInterval(function(){ 
        if (cont){
            clearInterval(checkr);
            callback();
        }
    }, 1000);
}

function convertHTMLEntity(text){
    var span = document.createElement("span");
    return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
        span.innerHTML = entity;
        return span.innerText;
    });
}

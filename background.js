"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var initData = function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(arr){
        var activeTab = arr[0];
        var url = (activeTab.url).toLowerCase();

        if (!/(stackoverflow\.com)/gi.test(url)) storage.set({ count: 0 });
        return true;
    });
}

var jsfRequest = function(resObj){
    var js   = resObj.js;
    var css  = resObj.css;
    var html = resObj.html;

    var uri = "https://jsfiddle.net/";
    chrome.tabs.create({ url: uri });

    chrome.tabs.query({ active: true, currentWindow: true }, function(arr){
        var activeTab = arr[0];
        var url = (activeTab.url).toLowerCase();

        if (/(jsfiddle\.net)/gi.test(url)) storage.set({ js: js, css: css, html: html });
        return true;
    });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    switch(request.type){
        case "url": {
            jsfRequest(request.options);
            break;
        }
        case "init": {
            initData();
            break;
        }
    }
});

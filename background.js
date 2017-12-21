"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var uri = "https://jsfiddle.net/";

var initData = function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(arr){
        var activeTab = arr[0];
        var url = (activeTab.url).toLowerCase();

        if (!/(stackoverflow\.com)/gi.test(url)) storage.set({ count: 0 });
        return true;
    });
}

var jsfRequest = function(resObj){
    var js   = (resObj.js   ? resObj.js   : "");
    var css  = (resObj.css  ? resObj.css  : "");
    var html = (resObj.html ? resObj.html : "");

    chrome.tabs.create({ url: uri });

    chrome.tabs.query({ active: true, currentWindow: true }, function(arr){
        var activeTab = arr[0];
        var url = (activeTab.url).toLowerCase();

        if (/(jsfiddle\.net)/gi.test(url)) postReq("https://jsfiddle.net/api/post/library/pure/", { js: js, css: css, html: html });
        return true;
    });
};

function postReq(url, data) {
    chrome.tabs.create({ url: chrome.runtime.getURL("./post/post.html") }, function(tab){
        var handler = function(tabId, changeInfo){
            if(tabId === tab.id && changeInfo.status === "complete"){
                chrome.tabs.onUpdated.removeListener(handler);
                chrome.tabs.sendMessage(tabId, { url: url, data: data });
            }
        }
        chrome.tabs.onUpdated.addListener(handler);
        chrome.tabs.sendMessage(tab.id, { url: url, data: data });
    });  
}

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

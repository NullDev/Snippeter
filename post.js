var onMessageHandler = function(message){
    chrome.runtime.onMessage.removeListener(onMessageHandler);
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", message.url);
    for (var key in message.data){
        var field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("name", key);
        field.setAttribute("value", message.data[key]);
        form.appendChild(field);
    }
    document.body.appendChild(form);
    form.submit();
}

chrome.runtime.onMessage.addListener(onMessageHandler);

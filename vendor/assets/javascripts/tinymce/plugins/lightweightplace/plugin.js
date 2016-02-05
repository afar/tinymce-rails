tinymce.PluginManager.add('lightweightplace', function(editor, url) { //custom plugin for adding a lightweight place
    editor.addButton('lightweightplace', {
        text: 'LWP',
        icon: false,
        onclick: function() {
            editor.windowManager.open({
                title: 'Lightweight Place',
                body: [
                    {type: 'textbox', name: 'title', label: 'Title', value: editor.selection.getContent({format : 'text'})},
                    {type: 'textbox', name: 'address', label: 'Address'},
                    {type: 'label', name: 'choose category', label: 'Choose highlight categories'},
                    {type: 'checkbox', name: 'category_eat', value: 'eat', label: "Eat"},
                    {type: 'checkbox', name: 'category_drink', value: 'drink', label: "Drink"},
                    {type: 'checkbox', name: 'category_stay', value: 'stay', label: "Stay"},
                    {type: 'checkbox', name: 'category_do', value: 'do', label: "Do"},
                    {type: 'checkbox', name: 'category_shop', value: 'shop', label: "Shop"}
                ],
                onsubmit: function(e) {
                    selected_text = editor.selection.getContent({format : 'text'})
                    var xmlHttp = new XMLHttpRequest();

                    var categories = []
                    if (e.data.category_eat) {categories.push("eat")}
                    if (e.data.category_drink) {categories.push("drink")}
                    if (e.data.category_stay) {categories.push("stay")}
                    if (e.data.category_do) {categories.push("do")}
                    if (e.data.category_shop) {categories.push("shop")}

                    var url;
                    if (window.location.host === "l.afar.com:3000"){
                      url = "http://l.afar.com:3000/lightweight_place/highlights/create"
                    } else {
                      url = "/lightweight_place/highlights/create"
                    }

                    params = JSON.stringify({
                        categories:categories, 
                        title:e.data.title, 
                        address:e.data.address,
                        authenticity_token: document.getElementsByName("csrf-token")[0].getAttribute("content")
                    })
                    xmlHttp.open( "POST", url, false )
                    xmlHttp.setRequestHeader("Content-type", "application/json");
                    xmlHttp.send(params)

                    if (xmlHttp.status === 200) {
                        result = JSON.parse(xmlHttp.responseText)
                        content = "<a href='" + result.url + "'>" + result.name + "</a>"
                        if (selected_text && selected_text != "") {
                            editor.insertContent(content);
                        } else {
                            editor.selection.setContent(content);
                        }
                    } else {
                        alert("Error creating lightweight place");
                    }
                }
            });
        }
    });

    editor.addMenuItem('lightweightplace', {
        text: 'lightweightplace plugin',
        context: 'tools',
        onclick: function() {
            editor.windowManager.open({
                title: 'TinyMCE site',
                url: 'http://www.tinymce.com',
                width: 1500,
                height: 600,
                buttons: [{
                    text: 'Close',
                    onclick: 'close'
                }]
            });
        }
    });
});
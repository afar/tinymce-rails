tinymce.PluginManager.add('lightweightplace', function(editor, url) {
    // Add a button that opens a window
    editor.addButton('lightweightplace', {
        text: 'LWP',
        icon: false,
        onclick: function() {
            // Open window
            editor.windowManager.open({
                title: 'Lightweight Place',
                body: [
                    {type: 'textbox', name: 'title', label: 'Title'},
                    {type: 'textbox', name: 'address', label: 'Address'},
                    {type: 'listbox', name: 'category', label: 'category', 'values': [
                        {text: 'Eat', value: 'eat'},
                        {text: 'Drink', value: 'drink'},
                        {text: 'Stay', value: 'stay'},
                        {text: 'Do', value: 'do'},
                        {text: 'Shop', value: 'shop'},
                        ]
                    }
                ],
                onsubmit: function(e) {
                    selected_text = editor.selection.getContent({format : 'text'})
                    var xmlHttp = new XMLHttpRequest();

                    params = JSON.stringify({category:e.data.category, auth_token:"AFAR_API_USER"})
                    xmlHttp.open( "POST", "http://l.afar.com:3000/lightweight_place/highlights/create", false )
                    xmlHttp.setRequestHeader("Content-type", "application/json");
                    xmlHttp.send(params)

                    if (xmlHttp.status === 200) {
                        result = JSON.parse(xmlHttp.responseText)
                        editor.selection.setContent("<a href='" + result.url + "'>" + selected_text + "</a>");
                    } else {
                        alert("Error creating lightweight place");
                    }
                }
            });
        }
    });

    // Adds a menu item to the tools menu
    editor.addMenuItem('lightweightplace', {
        text: 'lightweightplace plugin',
        context: 'tools',
        onclick: function() {
            // Open window with a specific url
            editor.windowManager.open({
                title: 'TinyMCE site',
                url: 'http://www.tinymce.com',
                width: 800,
                height: 600,
                buttons: [{
                    text: 'Close',
                    onclick: 'close'
                }]
            });
        }
    });
});
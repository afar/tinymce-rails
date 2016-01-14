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
                        {text: 'Left', value: 'left'},
                        {text: 'Right', value: 'right'},
                        {text: 'Center', value: 'center'}
                        ]
                    }
                ],
                onsubmit: function(e) {
                    // Insert content when the window form is submitted
                    //make the get call
                    //if success make the insert
                    //if not, do an alert or something
                    editor.insertContent('Lightweight Place: ' + e.data.title);
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
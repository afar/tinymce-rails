tinymce.PluginManager.add('lightweightplace', function(editor, url) {
    // Add a button that opens a window
    editor.addButton('example', {
        text: 'LWP',
        icon: false,
        onclick: function() {
            // Open window
            editor.windowManager.open({
                title: 'Lightweight Place',
                body: [
                    {type: 'textbox', name: 'title', label: 'Title of lightweight place'}
                ],
                onsubmit: function(e) {
                    // Insert content when the window form is submitted
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
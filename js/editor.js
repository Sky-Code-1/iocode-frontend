import Quill from "../node_modules/quill";

var options = {
    debug: 'info',
    modules: {
      toolbar: '#toolbar'
    },
    placeholder: 'Compose an epic...',
    readOnly: true,
    theme: 'snow'
  };

var quill = new Quill('#editor', options);
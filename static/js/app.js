// taken from http://stackoverflow.com/a/1404100
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function save_note() {
  $.post('/save', {
    note_url: window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1),
    text: $('textarea').val() === undefined ? text : $('textarea').val()
    }, function(res) {
      console.log(res);
  })
}

function set_typing_listener() {
  $('#textbox').typing({
    start: function (event, $elem) {},
    stop: function (event, $elem) {
      var text = $('textarea').val();
      save_note();
    },
    delay: 1000
  });
}

function format_note() {
  save_note();
  text = $('#textbox').val();
  $('#textbox').replaceWith('<div id="textbox">' + marked(text) + '</div>');
  $('#md-note').html('Edit note');
  formatted = true;
}

function unformat_note() {
  $('#textbox').replaceWith('<textarea id="textbox" spellcheck="true" autofocus>' + text + '</textarea>');
  $('#md-note').html('Format note');
  set_typing_listener();
  formatted = false;
}

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      return highlighter.javascript(code);
    }
    return code;
  }
});

var formatted = false;
var text = $('textarea').val() || '';

if(getURLParameter('formatted') == 'true') {
  formatted = true;
  format_note();
}

set_typing_listener();

$('#save-note').click(save_note);

$('#md-note').click(function () {
  formatted ? unformat_note() : format_note();
});
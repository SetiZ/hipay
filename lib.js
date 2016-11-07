// Create your HiPayRequestor library here...

var HiPayRequestor = {}

HiPayRequestor.sendRequest = function(params) {
  var url = "http://test-javascript.000webhostapp.com/signParams.php"

  var str = Object.keys(params).map(function(key){
    return "data[" + encodeURIComponent(key) + ']=' + encodeURIComponent(params[key]);
  }).join('&');

  var data = {
    "redirect": "http://localhost:8080/redirect.html",
    "data" : str
  }

  var result = jQuery.Deferred()

  // create invisible iframe
  var invisible = document.createElement("iframe")
  invisible.id = "form_iframe"
  // invisible.style = "width:0;height:0;border:0px solid #fff;"

  invisible.src = "form.html"
  document.body.appendChild(invisible)

  $('#form_iframe').on("load", function() {
    console.log("la")
    console.log($('#form_iframe'))
    console.log($('#form_iframe')[0].src)
      $('#form_iframe').contents().find('form')[0].submit(function(event) {
        event.preventDefault()
        console.log("ici")
        console.log($('#form_iframe'))
        console.log($('#form_iframe').location)
      });
  })

  return result.promise()

}

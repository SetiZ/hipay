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


  // var form = "<form id ='form' method='POST' action='"+url+"'><input name='redirect' value='"+data["redirect"]+"'><input name='data' value='"+data["data"]+"'></form>"

  // invisible.src = 'data:text/html;charset=utf-8,' + encodeURI(form);


  invisible.src = "form.html"

  document.body.appendChild(invisible)

  // $('#form_iframe')[0].contentDocument.write(form)

  $('#form_iframe').on('load', function() {
      // $('#form_iframe').contents().find('form')[0].submit();

        $('#form_iframe').contents().find('form')[0].submit(function() {
          $.ajax({
            url: "http://test-javascript.000webhostapp.com/signParams.php",
            type: POST,
            data : $('#form_iframe').contents().find('form').find("input").serialize(), // $('#form_iframe').contents().find('form')[0].serialize(),
            success: function(response) {
              console.log(response)
              console.log($('#form_iframe').contents().find('body').html())
              result.resolve()
            },
            error: function() {
              result.reject()
            }
          });
          return result.promise()
      });

  })

  // return result.promise()

  // var post = $.ajax({
  //   type: "POST",
  //   url: url,
  //   data: data
  // })
  //
  // return post
}

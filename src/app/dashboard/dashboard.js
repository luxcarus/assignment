(function(){
  
  function callback (data) {
    new Datatable({
      selector: '#carTable',
      style: 'basic', /* basic or summer */
      search: true,
      responsive: true,
      edit: true,
      data: data
    }).init()
  }

  window.onload = function () {
    console.log('onload')

    // to select data
    var ajax = new Ajax({
      url: "../data/clients.json",
      method: "GET",
      dataType: 'json',
      async: true,
      success: function (data) {
        callback(data)
      },
      error: function (err) {
        console.error(err)
      }
    })
    ajax.request()
  }

})(window)
(function(){
  
  function callback (data) {
    new Datatable({
      selector: '#carTable',
      style: 'basic',
      // show: true,
      // sort: true,
      // search: true,
      pagination: true,
      responsive: true,
      editable: true,
      data: data
    }).init()
  }

  window.onload = function () {
    console.log('onload')

    // to get selector
    var dashboard = document.querySelector('#dashboard')

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
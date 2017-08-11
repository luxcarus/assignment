(function(){
  
  function handler (data) {
    var datatable = new Datatable({
      selector: '#dashboard',
      paging: true,
      sort: true
    })
    datatable.init(data)
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
        handler(data)
      },
      error: function (err) {
        console.error(err)
      }
    })
    ajax.request()

  }

})(window)
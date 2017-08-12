function Show () {}
Show.prototype = new Panel()
Show.prototype.attachShow = function () {
  
    // variables
    var $this = this,
        options = [10,25,50,100],
        div_show, select,
        targetEl = document.getElementById(this.targetId)
  
    // to create div.show
    div_show = document.createElement('div')
    div_show.setAttribute('id', 'ttShow')
    div_show.setAttribute('class', 'tt-show')
  
    // to create select#show
    select = document.createElement('select')
  
    // to crate options and to append
    var size = options.length
    for (var i = 0; i < size; i++) {
      var option = document.createElement("option")
      option.value = options[i]
      option.text = options[i]
      select.appendChild(option)
    }
  
    // to append
    targetEl.appendChild(div_show)
    div_show.appendChild(select)
  
    // to add events
    select.addEventListener('change', function (e) {
      $this.renderContent()
    })
  }

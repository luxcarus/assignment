function Search () {}
Search.prototype = new Panel()
Search.prototype.attachSearch = function () {

    // variables
    var div_search, input
        targetEl = document.getElementById(this.targetId)
  
    // to crate div.search
    div_search = document.createElement('div')
    div_search.setAttribute('id', 'ttSearch')
    div_search.setAttribute('class', 'tt-search')
    
    // to create input#search
    input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'search')
  
    // to append
    div_search.appendChild(input)
    // targetEl.appendChild(div_search)
    
    targetEl.appendChild(div_search)
  
    // to add events
    input.addEventListener('', function () {
  
    })
  
  }
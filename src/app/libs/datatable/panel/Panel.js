function Panel () {
  this.seedEl = document.querySelector(this.opts.selector)
  this.targetId = 'ttPanel'
}
Panel.prototype = new Datatable()
Panel.prototype.init = function () {
  var panelId = 'ttPanel'
  if (!document.getElementById(this.targetId)) {
    var panel = null
    panel = document.createElement('div')
    panel.setAttribute('id', this.targetId)
    panel.setAttribute('class', 'tt-layer-1')
    this.seedEl.appendChild(panel)
  }

}
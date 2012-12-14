!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var ConfirmPopover = function (element, options) {
    this.init('confirmPopover', element, options)
    this.$element.click( $.proxy( this.handleClick, this ) )
  }


  /* NOTE: CONFIRM-POPOVER EXTENDS BOOTSTRAP-POPOVER.js
     ========================================== */

  ConfirmPopover.prototype = $.extend({}, $.fn.popover.Constructor.prototype, {

    constructor: ConfirmPopover

    // inherit show
  , _show : $.fn.popover.Constructor.prototype.show

  , setContent : function() {
      var $tip    = this.tip()
        , content = this.getContent()

      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)
      this.setupOkButton()
      this.setupCancelButton()
      

    }

  , setupOkButton : function() {
      var okText     = this.$element.data('ok-text') || this.options.okText
        , that        = this
        , element     = this.tip().find('.popover-buttons .ok-btn')

      if( !okText ) element.hide()
      else element.text(okText) && $.each( this.options.copyAttributes, function() { element.attr(this, that.$element.attr(this) ) })
    }

  , setupCancelButton : function() {
      var cancelText  = this.$element.data('cancel-text') || this.options.cancelText
        , element     = this.tip().find('.popover-buttons .cancel-btn')

      if( !cancelText ) element.hide()
      else element.text(cancelText)
    }

  , cancel          : function(event) {
      event && event.preventDefault()
      this.hide()
  }

  , show            : function() {
      this._show()
      this.tip().find('.popover-buttons .cancel-btn').click( $.proxy(this.cancel, this) )
    }

  , handleClick : function(event) {
      this.options.stopPropagation && event.stopPropagation()
      this.options.preventDefault  && event.preventDefault()
    }

  })

 /* CONFIRM-POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.confirmPopover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('confirm-popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('confirm-popover', (data = new ConfirmPopover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.confirmPopover.Constructor = ConfirmPopover

  $.fn.confirmPopover.defaults = $.extend({} , $.fn.popover.defaults, {
      stopPropagation   : true
    , preventDefault    : true
    , placement         : 'top'
    , okText            : 'Ok'
    , cancelText        : 'Cancel'
    , copyAttributes    : [ 'href', 'data-method', 'data-remote' ]
    , template          : '<div class="popover">'                                 +
                            '<div class="arrow"></div>'                           +
                            '<div class="popover-inner">'                         +
                              '<div class="popover-content"><p></p></div>'        +
                              '<div class="popover-buttons">'                     +
                                '<a class="cancel-btn btn btn-mini"></a>'         +
                                '<a class="ok-btn btn btn-mini btn-primary"></a>' +
                              '</div>'                                            +
                            '</div>'                                              +
                          '</div>'
  })

}(window.jQuery);

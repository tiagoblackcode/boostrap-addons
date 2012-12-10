!function($) {

    "use strict"; // jshint ;_;

    var RadioGroup = function(element, options) {

        this.options  = options
        this.$element = $(element)
        this.$target  = $('[data-target-for=' + this.$element.prop('id') + ']') || false
        this.items    = this.$element.children()

        this.items.on('click', $.proxy(this.select, this));
        this.initSelection()
    }

    RadioGroup.prototype = {
         constructor: RadioGroup
        
      ,  select: function(event) {
           if( !event ) return;

           var $selected  = event instanceof $.Event && $(event.currentTarget) || $(event)
           this.clearSelection()
           

           if( this.$target ) {
            this.$target.prop( 'value', $selected.prop('value') || $selected.html() )
                        .trigger('change')
           } else {
            $selected.find('input[type=radio]')
                     .prop('checked', true)
                     .trigger('change')
           }

          $selected.addClass(this.options.selected) 
           event instanceof $.Event && (event.stopPropagation() || event.preventDefault())
         }
        
      ,  clearSelection: function() {
            this.$target && this.$target.prop('value', '') || 
            this.items.find('input[type=radio]').prop('checked', false)

            this.items.removeClass(this.options.selected)
         }
      
      ,  initSelection: function() {
            if( this.$target ) {
              var $element = this.$element.find('[value="' + this.$target.prop('value') + '"]')
            } else {
              var $checked = this.items.find('input[type="radio"]:checked')
              var $element = $checked.closest('[data-behaviour="radio-group"] > *')
            }

            this.select($element)
            
         }
    }


    $.fn.radioGroup = function(option) {
        var args = Array.apply(null, arguments)
        args.shift()
       
        return this.each(function() {
            var $this = $(this),
                data = $this.data('radio-group'),
                options = $.extend({}, $.fn.radioGroup.defaults, $this.data(), typeof option == 'object' && option)
                if (!data) $this.data('radio-group', (data = new RadioGroup(this, options))) 
                if (typeof option == 'string') data[option].apply(data,args)
        })
    }
        
    $.fn.radioGroup.defaults = {
        selected : 'active'
    }
    
    $.fn.radioGroup.Constructor = RadioGroup

}(window.jQuery);
﻿(function($) {
	$(function() {
  
    $( '.filter-button' ).click( function() {
      $( this ).toggleClass( 'i-active' );
    });
	
		$( ".bj-catalogue-filter-switch" ).click( function(e) {
			e.preventDefault();
			$( this ).hide().next( ".bj-catalogue-filter" ).slideDown();
		});
		
		$( ".bj-checkbox input:checkbox" ).on( "change", function() {
			var $this = $( this );
			if ( this.checked ) {
				$this.closest( ".bj-checkbox" ).addClass( "i-checked" );
			} else {
				$this.closest( ".bj-checkbox" ).removeClass( "i-checked" );
			}
		});
		
		$( ".bj-catalogue-filter input:checkbox" )
		.on( "change", function() {
			var $form = $( this ).closest( "form" ),
					flag = false;
			
			$form.find( "input:checkbox" ).each( function() {
				if ( this.checked ) {
					flag = true;
				}
			});
		})
		.each( function() {
			if ( this.checked ) {
				$( this ).trigger( "change" );
			}
		});
		
		!function range() {
			var $range = $( ".bj-catalogue-filter .bj-range" ),
					$inputMin = $range.find( ".bj-range__input-min" ),
					$inputMax = $range.find( ".bj-range__input-max" ),
					$value = $range.find( ".bj-range__value" ),
					$slider = $range.find( ".bj-range__slider" ),
					step = +$inputMin.attr( "step" ) || +$inputMax.attr( "step" ) || 0,
					min = +$inputMin.attr( "min" ) || 100,
					max = +$inputMax.attr( "max" ) || 3000;
			
			$slider.slider({
				range: true,
				min: min,
				max: max,
				values: [ $inputMin.val(), $inputMax.val() ],
				step: step,
				slide: function( event, ui ) {
					$value.text( 'от ' + ui.values[0] + ' до ' + ui.values[1] + ' руб.' );
					$inputMin.val( ui.values[0] );
					$inputMax.val( ui.values[1] );
				}
			});
		}();
		
	});
}( jQuery ));
(function($) {

  function discountWindow() {
    var $discount = $( '#discount' );
    
    var scrollEvent;
		var scrollIntervalEvent;
		var intervalId;
    
    var moveEvent;
		var moveIntervalEvent;
    
    var keyupEvent;
		var keyupIntervalEvent;
    
		var showTimeoutId;
    var time = $(' #discountLink ').data( 'time' );
    
    startTimeout();
    $(window).bind("scroll", scrollWindow);
    $(document)
      .bind( "mousemove", mousemoveDocument )
      .bind( "keyup", keyupDocument );
    
    $discount.on('hidden.bs.modal', function (e) {
      $discount.removeClass( 'i-success' );
      $discount.find( '.form-control' ).val('');
      if ( !$.cookie( 'asobio_subscription' ) || $.cookie( 'asobio_subscription' ) === 'close' ) {
        $.cookie( 'asobio_subscription', 'close', { expires: 3, path: '/', domain: window.location.hostname });
      }
    })
    
    function startTimeout() {
      if ( !$.cookie( 'asobio_subscription' ) &&
           $.cookie( 'mobile' ) && $.cookie( 'mobile' ) !== 'mobile') {
        showTimeoutId = setTimeout( function() {
          if ( $( '.modal.in' ).length === 0 && $( '.popup-window:visible' ).length === 0) {
            $discount.modal('show');
          }
        }, time );
      }
    }
    
    function mousemoveDocument(e) {
      moveEvent = e;
			if ( moveIntervalEvent || scrollIntervalEvent || keyupIntervalEvent ) return;
			
			moveIntervalEvent = e;
			clearTimeout( showTimeoutId );
			
			intervalId = setInterval( function() {
				if ( moveIntervalEvent !== moveEvent ) {
					moveIntervalEvent = moveEvent;
					return;
				}
				clearInterval( intervalId );
				moveIntervalEvent = undefined;
				startTimeout();
			}, 100);
    }
    
    function keyupDocument(e) {
			keyupEvent = e;
			if ( keyupIntervalEvent || scrollIntervalEvent || moveIntervalEvent ) return;
			
			keyupIntervalEvent = e;
			clearTimeout( showTimeoutId );
			
			intervalId = setInterval( function() {
				if ( keyupIntervalEvent !== keyupEvent ) {
					keyupIntervalEvent = keyupEvent;
					return;
				}
				clearInterval( intervalId );
				keyupIntervalEvent = undefined;
				startTimeout();
			}, 100);
		}
    
    function scrollWindow(e) {
			scrollEvent = e;
			if ( scrollIntervalEvent || moveIntervalEvent || keyupIntervalEvent ) return;
			
			scrollIntervalEvent = e;
			clearTimeout( showTimeoutId );
			
			intervalId = setInterval( function() {
				if ( scrollIntervalEvent !== scrollEvent ) {
					scrollIntervalEvent = scrollEvent;
					return;
				}
				clearInterval( intervalId );
				scrollIntervalEvent = undefined;
				startTimeout();
			}, 100);
		}

    /*$( '#getDiscount' ).click( function(e) {
      var $link = $( this );
      var $email = $link.closest( '.modal' ).find( '.form-group' );
      var email = $email.find( '.form-control' ).val();
      if ( email && email.match( /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i )) {
        $.ajax({
          url: $link.data( 'url' ),
          type: $link.data( 'method' ),
          dataType: "json",
          data: "email=" + email,
          success: function(data) {
            $email.removeClass( 'has-error' );
            if ( data.status === 'success' ) {
              $link.closest( '.modal' ).addClass( 'i-success' );
              $.cookie( 'asobio_subscription', 'sent', { expires: 365, path: '/', domain: window.location.hostname });
            } else if ( data.status === 'error' && data.text ) {
              $link.closest( '.modal' ).addClass( 'i-error' ).find( 'h2.i-error' ).text( data.text );
            }
          },
          error: function() {}
        });
      } else {
        $email.addClass( 'has-error' );
      }
      
      e.preventDefault();
    });*/
  }
  
  $(function() {
    discountWindow();
  });
  
}( jQuery ));
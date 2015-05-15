( function($) {
  $( function() {
  
    $( '.bx_catalog_item .modal' ).appendTo( 'body' );
    
    //when modal is hidden clean the container, delete JCCatalogElement instance
    $( '#catalog-element-modal' ).on( 'hidden.bs.modal', function(e) {
      $( '#catalog-element-modal .modal-content' ).empty();
      window.JCCatalogElement = undefined;
    });
  
    /*$( '.b-show-element-detail' ).bind( 'click', function(e) {
      var $this = $( this );
      e.preventDefault();
      $.ajax({
        url: $this.attr( 'href' ),
        type: 'POST',
        dataType: 'html',
        success: function( data ) {
          //$this.parent().find( '.modal-body' ).html( data );
        },
        error: function() {}
      });
    });*/
  
  });
}( jQuery ));
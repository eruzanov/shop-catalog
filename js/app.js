document.querySelector( '.shop-catalog-menu' ).addEventListener( 'click', function () {
  if ( document.documentElement.clientWidth > 500 ) return;
  document.querySelector( '.shop-catalog-mobile' ).classList.remove( 'hide' );
} );

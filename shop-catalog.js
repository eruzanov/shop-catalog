// insert content
function generateListHTML (list ) {
    var ul = document.createElement( 'ul' ), li;
    for ( var i = 0; i < list.length; i++ ) {
        li = document.createElement( 'li' );
        li.textContent = list[i].name;
        ul.appendChild( li );
        if ( list[i].sub ) ul.appendChild( generateListHTML( list[i].sub ) );
    }
    return ul;
}
document.querySelector( '.shop-catalog' ).appendChild( generateListHTML( shopCatalog ) );

// fixed main-menu
window.addEventListener( 'scroll', function () {
    var sticky = document.querySelector( '.main-menu' );
    sticky.classList[ window.pageYOffset >= 136 ? 'add' : 'remove' ]( 'sticky' );
} );

// insert tree of sub menu
function generateSubMenuContent ( list ) {
    var wrapper = document.createElement( 'div' ),
        ul = document.createElement( 'ul' ),
        li;
    wrapper.classList.add( 'sub-menu_content' );
    wrapper.appendChild( ul );
    for ( var i = 0; i < list.length; i++ ) {
        li = document.createElement( 'li' );
        li.textContent = list[i].name;
        ul.appendChild( li );
    }
    return wrapper;
}
function generateSubMenu ( list ) {
    var wrapper = document.createElement( 'div' ),
        ul = document.createElement( 'ul' ),
        li = document.createElement( 'li' );
    wrapper.classList.add( 'sub-menu' );
    ul.classList.add( 'sub-menu_list' );
    li.classList.add( 'sub-menu_item' );
    wrapper.appendChild( ul );
    for ( var i = 0, item; i < list.length; i++ ) {
        item = li.cloneNode();
        console.log( list[i] );
        item.textContent = list[i].name;
        if ( list[i].sub ) item.appendChild( generateSubMenuContent( list[i].sub ) );
        ul.appendChild( item );
    }
    return wrapper;
}
//document.querySelector( '.shop-catalog-menu' ).appendChild( generateSubMenu( shopCatalog ) );

// set dimension for sub-menu
var setDimension = ( function () {
    var subMenu = document.querySelector( '.sub-menu_list' ),
        subMenuContent = document.querySelector( '.sub-menu_content' );
    return function () {
        var windowHeight = document.documentElement.clientHeight,
            mainMenu = document.querySelector( '.main-menu' ),
            offsetTop = mainMenu.getBoundingClientRect().top < 0 ? 0 : mainMenu.getBoundingClientRect().top,
            height = windowHeight - mainMenu.offsetHeight - offsetTop - 30;
        subMenuContent.style.height = subMenu.style.height = height + 'px';
        //subMenuContent.forEach( function ( el ) {
        //    el.style.height = height + 'px';
        //} );
    };
} )();
window.addEventListener( 'scroll', setDimension );
window.addEventListener( 'resize', setDimension );
setDimension();

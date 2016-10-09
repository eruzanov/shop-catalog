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

//<div class="sub-menu_content">
//  <div class="sub-menu_content_item">
//    <div class="sub-menu_content_item-title">Аксессуары для ванной</div>
//    <ul>
//      <li>Аксессуары</li>
//      <li>Занавес</li>
//      <li>Зеркала</li>
//      <li>Карнизы</li>
//      <li>Коврики</li>
//      <li>Полотенцедержатели</li>
//    </ul>
//  </div>
//</div>
function generateSubMenuContent ( list ) {
    var subMenuContent = document.createElement( 'div' ),
        subMenuContentItem = document.createElement( 'div' ),
        subMenuContentItemTitle = document.createElement( 'div' ),
        ul = document.createElement( 'ul' ),
        li = document.createElement( 'li' );
    subMenuContent.classList.add( 'sub-menu_content' );
    subMenuContentItem.classList.add( 'sub-menu_content_item' );
    subMenuContentItemTitle.classList.add( 'sub-menu_content_item-title' );

    for ( var i = 0; i < list.length; i++ ) {
        subMenuContentItem.innerHTML = '';
        subMenuContentItemTitle.textContent = list[i].name;
        subMenuContentItem.appendChild( subMenuContentItemTitle.cloneNode( true ) );
        if ( list[i].sub ) {
            ul.innerHTML = '';
            for ( var j = 0; j < list[i].sub.length; j++ ) {
                li.textContent = list[i].sub[j].name;
                ul.appendChild( li.cloneNode( true ) );
            }
            subMenuContentItem.appendChild( ul.cloneNode( true ) );
        }
        subMenuContent.appendChild( subMenuContentItem.cloneNode( true ) );
    }

    return subMenuContent;
}
//<li class="sub-menu_item">
//  <a href="#">Керамогранит</a>
//</li>
function generateSubMenu ( list ) {
    var frag = document.createDocumentFragment(),
        li = document.createElement( 'li' ),
        a = document.createElement( 'a' );
    a.href = '#';
    li.classList.add( 'sub-menu_item' );
    for ( var i = 0, node, nodeLink; i < list.length; i++ ) {
        node = li.cloneNode();
        nodeLink = a.cloneNode();
        nodeLink.textContent = list[i].name;
        node.appendChild( nodeLink );
        if ( list[i].sub ) {
            node.appendChild( generateSubMenuContent( list[i].sub ) );
        }
        frag.appendChild( node );
    }
    return frag;
}
document.querySelector( '.sub-menu_list').innerHTML = '';
document.querySelector( '.sub-menu_list' ).appendChild( generateSubMenu( shopCatalog ) );

// set dimension for sub-menu
var setDimension = ( function () {
    var subMenu = document.querySelector( '.sub-menu_list' ),
        subMenuContent = document.querySelectorAll( '.sub-menu_content' );
    return function () {
        var windowHeight = document.documentElement.clientHeight,
            mainMenu = document.querySelector( '.main-menu' ),
            offsetTop = mainMenu.getBoundingClientRect().top < 0 ? 0 : mainMenu.getBoundingClientRect().top,
            height = windowHeight - mainMenu.offsetHeight - offsetTop - 30;
        subMenu.style.height = height + 'px';
        subMenuContent.forEach( function ( el ) { el.style.height = height + 'px'; } );
    };
} )();
window.addEventListener( 'scroll', setDimension );
window.addEventListener( 'resize', setDimension );
setDimension();

// toggle visible sub menu contents
var subMenu = document.querySelector( '.sub-menu' );
var subMenuList = document.querySelector( '.sub-menu_list' );
var subMenuContents = subMenu.querySelectorAll( '.sub-menu_content' );
subMenuList.addEventListener( 'mouseover', function ( e ) {
    var subMenuItem = e.target.closest( '.sub-menu_item' ), subMenuContent;
    if ( !subMenuItem ) return;
    subMenuContent = subMenuItem.querySelector( '.sub-menu_content' );
    subMenuContents.forEach( function ( el ) {
        el.style.display = 'none';
    } );
    if ( subMenuContent ) {
        subMenu.style.width = '630px';
        subMenuContent.style.display = 'block';
    } else {
        subMenu.style.width = '315px';
    }
} );
subMenu.addEventListener( 'mouseover', function ( e ) { e.stopPropagation(); } );
document.body.addEventListener( 'mouseover', function () {
    subMenu.style.width = '315px';
    subMenuContents.forEach( function ( el ) {
        el.style.display = 'none';
    } );
} );

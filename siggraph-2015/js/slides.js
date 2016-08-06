var slides = [], current;
var sections = document.getElementsByTagName( 'section' );

while ( sections.length ) {

  slides.push( sections[ 0 ] );
  document.body.removeChild( sections[ 0 ] );

}

var setSlide = function ( id ) {

  if ( current !== undefined ) {

    document.body.removeChild( slides[ current ] );

  }

  window.location.hash = id;
  position.innerHTML = ( id + 1 ) + ' / ' + slides.length;

  document.body.appendChild( slides[ id ] );

  var v = slides[ id ].querySelector( 'video' );
  if( v && v.autoplay ) {
    v.pause();
    v.currentTime = 0;
    v.play();
  }

  Prism.highlightAll();

  current = id;

}

var prevSlide = function () {

  setSlide( Math.max( 0, current - 1 ) );

}

var nextSlide = function () {

  setSlide( Math.min( slides.length - 1, current + 1 ) );

}

// controls

var controls = document.createElement( 'div' );
controls.id = 'controls';
document.body.appendChild( controls );

var arrowPrev = document.createElement( 'span' );
arrowPrev.innerHTML = '⟵';
arrowPrev.style.cursor = 'pointer';
arrowPrev.addEventListener( 'click', function ( event ) {

  prevSlide();

}, false );
controls.appendChild( arrowPrev );

var position = document.createElement( 'span' );
position.style.cursor = 'default';
controls.appendChild( position );

var arrowNext = document.createElement( 'span' );
arrowNext.innerHTML = '⟶';
arrowNext.style.cursor = 'pointer';
arrowNext.addEventListener( 'click', function ( event ) {

  nextSlide();

}, false );
controls.appendChild( arrowNext );

window.addEventListener( 'keyup', function ( event ) {

  switch ( event.keyCode ) {

    case 37:
      prevSlide();
      break;

    case 39:
      nextSlide();
      break;

  }

}, false );

//

setSlide( window.location.hash.length ? parseInt( window.location.hash.substr( 1 ) ) : 0 );

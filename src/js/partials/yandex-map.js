function initYandexMap(id){ 
  const locationMap = new ymaps.Map(id, {
    center: [59.977201, 30.314817],
    zoom: 17,
  })

  locationMap.geoObjects.add(
    new ymaps.Placemark([59.977201, 30.314817], {
      hintContent:'',
      balloonContent:'',
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../images/pin.png',
      iconImageSize: [40, 47],
      iconImageOffset: [-20, -23],
    })
  )

  locationMap.behaviors.disable('scrollZoom');
  locationMap.controls.remove('searchControl');
  locationMap.controls.remove('rulerControl');
  locationMap.controls.remove('typeSelector');
  locationMap.controls.remove('trafficControl');
  locationMap.controls.remove('geolocationControl');
  locationMap.controls.remove('fullscreenControl');
  locationMap.controls.remove('routeButtonControl');
}
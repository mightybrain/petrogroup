function initYandexMap(id){ 
  let locationMap = new ymaps.Map(id, {
      center: [55.728829, 60.521423],
      zoom: 13
  })

  locationMap.geoObjects.add(
      new ymaps.Placemark([55.728829, 60.521423], {
          hintContent:'',
          balloonContent:''
      }, {
          iconLayout: 'default#image',
          iconImageHref: '../images/pin.png',
          iconImageSize: [27, 35],
          iconImageOffset: [-14, -35]
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
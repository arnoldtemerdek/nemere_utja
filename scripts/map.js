var map;

var OSMLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var OCMLayer = new ol.layer.Tile({
      source: new ol.source.OSM({
        attributions: [
          new ol.Attribution({
            html: 'All maps &copy; ' +
                '<a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
          }),
          ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
      })
});

// overpass api for data: relation[route=bicycle][name='Drumul Nemirei'](45.73297, 25.79178, 46.11609, 26.41388);>;out;

var overlay = new ol.layer.Vector({
      title: 'added Layer',
      source: new ol.source.Vector({
         url: 'data/export.geojson',
         format: new ol.format.GeoJSON()
      }),
	  style: new ol.style.Style({
		 stroke: new ol.style.Stroke({color: 'red', width: 3}),
	  })
});

/*
var overlay = new ol.layer.Vector({
      title: 'added Layer',
      source: new ol.source.Vector({
         url: 'http://overpass-api.de/api/interpreter?data=[out:json];relation[route=bicycle](45.73297, 25.79178, 46.11609, 26.41388);>;out;',
         format: new ol.format.GeoJSON(),
      }),
	  style: new ol.style.Style({
		 stroke: new ol.style.Stroke({color: 'red', width: 3}),
	  })
});
*/

function change_layer(){
  var radio0 = document.getElementById('radio0');
    if (radio0.checked){
        layers[0].setVisible(true);
		layers[1].setVisible(false);
    }
  var radio1 = document.getElementById('radio1');
    if (radio1.checked){
        layers[1].setVisible(true);
		layers[0].setVisible(false);
    }
};

var layers = [];
layers[0] = OSMLayer;
layers[1] = OCMLayer;
layers[2] = overlay;


layers[1].setVisible(false);

function init(){
    map = new ol.Map({
        target:'map',
        renderer:'canvas',
    	view: new ol.View({
    		projection: 'EPSG:900913',
    		center:[2911338.64272,5770227.15372],
    		zoom:10
    	}),
		layers:layers
    });
}
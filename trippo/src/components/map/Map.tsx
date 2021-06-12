import * as React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

interface State {
  lng: number;
  lat: number;
  zoom: number;
  // marker: mapboxgl.Marker[];
}

export default class Map extends React.Component<{}, State> {
  mapContainer: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      lng: 0,
      lat: 40,
      zoom: 2,
      // marker: [],
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: Number(map.getCenter().lng.toFixed(4)),
        lat: Number(map.getCenter().lat.toFixed(4)),
        zoom: Number(map.getZoom().toFixed(2)),
      });
    });

    map.on("click", (event) => {
      // if (this.state.marker) {
      //   this.state.marker.remove();
      // }

      const coordinates = event.lngLat;
      const marker = new mapboxgl.Marker();

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        marker.remove();
      });

      marker.setLngLat(coordinates).addTo(map);
      // this.setState({ marker });
    });
  }

  render() {
    return (
      <div className="map-container">
        <div className="map-div" ref={this.mapContainer} />
      </div>
    );
  }
}

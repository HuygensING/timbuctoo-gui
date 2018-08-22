import React, { SFC } from 'react';
import { Map as OsMap, TileLayer, Marker } from 'react-leaflet';

interface MapProps {
    lat: number;
    long: number;
}

export const Map: SFC<MapProps> = props => (
    <OsMap center={[props.lat, props.long]} zoom={11} style={{ height: 180 }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={[props.lat, props.long]} />
    </OsMap>
);

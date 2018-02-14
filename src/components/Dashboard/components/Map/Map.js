import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

const MapContainer = () => <div></div>;
const Marker = ({lat, lng}) => <div lat={lat} lng={lng}><MaterialIcon icon="room"/></div>;

class Map extends Component {
    componentWillMount () {
        this.props.callbacks.getPhotos();
    }

    render () {
        return (
            <div className='google-map' style={{height: '640px'}}>
                <GoogleMapReact
                    defaultCenter={{ lat: 52.2297, lng: 21.0122 }}
                    defaultZoom={2}
                    options={{scrollwheel: false}}>
                    <MapContainer/>
                    <Marker lat={52.2297} lng={21.0122}/>
                </GoogleMapReact>
            </div>
        );
    }
}

export { Map };

Map.propTypes = {
    callbacks: PropTypes.object,
    photos: PropTypes.object
};

Marker.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
};

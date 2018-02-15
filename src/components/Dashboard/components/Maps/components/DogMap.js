import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

import './DogMap.css';

const MapContainer = () => <div></div>;
const Marker = ({lat, lng}) => <div lat={lat} lng={lng}><MaterialIcon color='#dc3545' icon="pets"/></div>;

class DogMap extends PureComponent {
    componentWillMount () {
        this.props.photos.list.map((photo) => {
            this.props.getDetails(photo.id);
        });
    }

    generateMarkers() {
        const { list } = this.props.photos;

        if (list[list.length - 1].details.id) {
            return list.map((item, idx) => {
                if (item.details.location) {
                    return (
                        <Marker 
                            key={idx} 
                            lat={parseInt(item.details.location.latitude, 10)} 
                            lng={parseInt(item.details.location.longitude, 10)}/>
                    );
                }
            });
        }
    }

    render () {
        const markersList = this.generateMarkers();

        return (
            <div className='dog-map'>
                <GoogleMapReact
                    defaultCenter={{ lat: 52.2297, lng: 21.0122 }}
                    defaultZoom={2}>
                    <MapContainer/>
                    {markersList}
                </GoogleMapReact>
            </div>
        );
    }
}

export { DogMap };

DogMap.propTypes = {
    getDetails: PropTypes.func,
    photos: PropTypes.object
};

Marker.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number
};

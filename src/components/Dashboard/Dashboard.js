import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Photos } from './components/Photos';
import { Map } from './components/Map';

import { photosGet, photoGetDetails, photosClear } from 'actions/photosActions';
import { alertShow } from 'actions/alertActions';

const KEY = '26c374c770dc49702c16c6fdf0ac60c9';

const mapStateToProps = (state) => {
    return {
        photos: state.photos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotos: () => {
            dispatch(() => {
                fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=canine&per_page=100&api_key=${KEY}&format=json&nojsoncallback=1`)
                    .then((resp) => resp.json())
                    .then((resp) => {
                        if (resp.stat === 'fail') {
                            dispatch(alertShow(resp.message));
                        } else {
                            const preparedPhotos = resp.photos.photo.map((photo) => photo = {...photo, details: {}});
                            dispatch(photosGet(preparedPhotos));
                        }
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            });
        },
        getPhotoDetails: (photoId) => {
            dispatch(() => {
                fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&photo_id=${photoId}&api_key=${KEY}&format=json&nojsoncallback=1`)
                    .then((resp) => resp.json())
                    .then((resp) => {
                        if (resp.stat === 'fail') {
                            dispatch(alertShow(resp.message));
                        } else {
                            dispatch(photoGetDetails(resp.photo));
                        }
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            });
        },
        clearPhotos: () => {
            dispatch(photosClear());
        }
    };
};

class Dashboard extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { getPhotos, getPhotoDetails, clearPhotos, photos } = this.props;

        const callbacks = {
            getPhotos,
            getPhotoDetails,
            clearPhotos
        };

        return (
            <div className="container-fluid">
                <h1>Flickr Photo Gallery</h1>
                <ul className="nav">
                    <li className="nav-item"><Link className="nav-link" to={'/'}>Photos</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={'/map'}>Map</Link></li>
                </ul>
                
                <Route exact path="/" render={() => <Photos photos={photos} callbacks={callbacks}/>} />
                <Route path="/map" render={() => <Map photos={photos} callbacks={callbacks}/>} />
            </div>
        );
    }
}

const connectedDashboard = withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

export { connectedDashboard as Dashboard };

Dashboard.propTypes = {
    getPhotos: PropTypes.func,
    getPhotoDetails: PropTypes.func,
    clearPhotos: PropTypes.func,
    photos: PropTypes.object,
    match: PropTypes.object
};

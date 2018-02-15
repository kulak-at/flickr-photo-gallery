import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Photos } from './components/Photos';
import { Maps } from './components/Maps';

import api from 'utils/api';

import { photosGet, photoGetDetails, photosClear } from 'actions/photosActions';

const mapStateToProps = (state) => {
    return {
        photos: state.photos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotos: () => {
            dispatch(() => {
                api.get('photos.search', '&tags=dog&per_page=100')
                    .then((resp) => {
                        if (!resp.code) {
                            const preparedPhotos = resp.photos.photo.map((photo) => photo = {...photo, details: {}});
                            dispatch(photosGet(preparedPhotos));
                        }
                    })
            });
        },
        getPhotoDetails: (photoId) => {
            dispatch(() => {
                api.get('photos.getInfo', `&photo_id=${photoId}`)
                    .then((resp) => {
                        if (!resp.code) {
                            dispatch(photoGetDetails(resp.photo));
                        }
                    })
            });
        },
        clearPhotos: () => {
            dispatch(photosClear());
        }
    };
};

class Dashboard extends Component {
    render () {
        const { getPhotos, getPhotoDetails, clearPhotos, photos } = this.props;

        const callbacks = {
            getPhotos,
            getPhotoDetails,
            clearPhotos
        };

        return (
            <div className="container-fluid">
                <ul className="nav my-2">
                    <li className="nav-item"><Link className="nav-link" to={'/'}>Photos</Link></li>
                    <li className="nav-item"><Link className="nav-link" to={'/maps'}>Maps</Link></li>
                </ul>
                
                <Route exact path="/" render={() => <Photos photos={photos} callbacks={callbacks}/>}/>
                <Route path="/maps" render={() => <Maps photos={photos} callbacks={callbacks}/>}/>
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

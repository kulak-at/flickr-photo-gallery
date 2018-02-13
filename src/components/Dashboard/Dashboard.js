import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { PhotoTile } from './components/PhotoTile';
import { Spinner } from 'components/Spinner';

import { photosGet, photoGetDetails } from 'actions/photosActions';
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
        }
    };
};

class Dashboard extends Component {
    constructor () {
        super();
        this.state = {
            photoLimit: 9
        };
    }

    componentWillMount () {
        this.props.getPhotos();
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll () {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        
        if (scrolledToBottom) {
            this.setState({
                photoLimit: this.state.photoLimit + 10
            });
        }
    }

    render () {
        const _generateList = () => {
            return this.props.photos.list.map((item, idx) => {
                if (idx <= this.state.photoLimit) {
                    return (
                        <PhotoTile key={idx} photoData={item} getDetails={this.props.getPhotoDetails}/>
                    );
                }
            });
        };

        const photoContent = this.props.photos.list.length ? _generateList() : <Spinner/>;

        return (
            <div className="container-fluid">
                <div className="row">
                    {photoContent}
                </div>
            </div>
        );
    }
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { connectedDashboard as Dashboard };

Dashboard.propTypes = {
    getPhotos: PropTypes.func,
    getPhotoDetails: PropTypes.func,
    photos: PropTypes.object
};

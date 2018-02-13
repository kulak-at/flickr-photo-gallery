import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { photosGet } from 'actions/photosActions';

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
                fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=canine&per_page=20&api_key=${KEY}&format=json&nojsoncallback=1`)
                    .then((resp) => resp.json())
                    .then((resp) => {
                        resp.photos.photo.map((photo) => {
                            Object.assign(photo, {
                                getDetails: () => {
                                    return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&photo_id=${photo.id}&api_key=${KEY}&format=json&nojsoncallback=1`)
                                        .then((details) => details.json())
                                        .then((details) => details);
                                }
                            });
                        });
                        dispatch(photosGet(resp.photos.photo));
                    });
            });
        }
    };
};

class Dashboard extends Component {
    constructor () {
        super();
    }

    componentWillMount () {
        this.props.getPhotos();
    }

    render () {
        const _generateList = () => {

            return this.props.photos.list.map((item, idx) => {
                return (
                    <div className="col-xs-12 col-md-6 col-lg-3" key={idx}>
                        {/* Todo: make component for each img with lazy loading of details */}
                        <div 
                            className="single-photo" 
                            style={{backgroundImage: `url(https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg)`}}>
                        </div>
                    </div>
                );
            });
        };

        const mappedList = this.props.photos.list.length ? _generateList() : <span>Loading</span>;

        return (
            <div className="card text-center">
                <div className="card-body">
                    <div className="row">
                        {mappedList}
                    </div>
                </div>
            </div>
        );
    }
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { connectedDashboard as Dashboard };

Dashboard.propTypes = {
    getPhotos: PropTypes.func,
    photos: PropTypes.object
};
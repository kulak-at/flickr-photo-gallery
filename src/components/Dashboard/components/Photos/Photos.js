import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PhotoTile } from './components/PhotoTile';
import { Spinner } from 'components/Spinner';


class Photos extends Component {
    constructor (props) {
        super(props);

        this.state = {
            photoLimit: 9
        };
    }

    componentWillMount () {
        this.props.callbacks.getPhotos();
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount () {
        this.props.callbacks.clearPhotos();
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
                        <PhotoTile key={idx} photoData={item} getDetails={this.props.callbacks.getPhotoDetails}/>
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

export { Photos };

Photos.propTypes = {
    callbacks: PropTypes.object,
    photos: PropTypes.object
};

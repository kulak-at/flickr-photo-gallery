import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'components/common/Spinner';
import { DogMap } from './components/DogMap';


class Maps extends PureComponent {
    componentWillMount () {
        this.props.callbacks.getPhotos();
    }

    componentWillUnmount () {
        this.props.callbacks.clearPhotos();
    }

    render () {
        const { photos } = this.props;
        const { getPhotoDetails } = this.props.callbacks;

        return (
            photos.list.length ? <DogMap photos={photos} getDetails={getPhotoDetails}/> : <Spinner/>
        );
    }
}

export { Maps };

Maps.propTypes = {
    callbacks: PropTypes.object,
    photos: PropTypes.object
};

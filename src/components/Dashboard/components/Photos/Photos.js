import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';

import { PhotoTile } from './components/PhotoTile';
import { Spinner } from 'components/common/Spinner';


class Photos extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            photoLimit: 7
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
                photoLimit: this.state.photoLimit + 8
            });
        }
    }

    render () {
        const { getPhotoDetails, openModal } = this.props.callbacks;
        const { list } = this.props.photos;
        const { photoLimit } = this.state;

        const _generateList = () => {
            return list.map((item, idx) => {
                if (idx <= photoLimit) {
                    return (
                        <PhotoTile key={idx} photoData={item} getDetails={getPhotoDetails} expandPhoto={openModal}/>
                    );
                }

                return null;
            });
        };

        const _generateScrollInfo = () => {
            if (list.length && photoLimit < list.length) {
                return (
                    <div className="col-sm-12 text-center">
                        <div className="my-5 pb-5">
                            <div>Scroll down to load more photos</div>
                            <MaterialIcon icon="cached" size='large'/>
                        </div>
                    </div>
                );
            }
            
            return null;
        };

        const photoContent = list.length ? _generateList() : <Spinner/>;

        return (
            <div className="container-fluid">
                <div className="row">
                    {photoContent}
                </div>
                <div className="row">
                    {_generateScrollInfo()}
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

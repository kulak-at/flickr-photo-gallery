import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './photoTile.css';

import { Spinner } from 'components/common/Spinner';

class PhotoTile extends PureComponent {
    componentWillMount () {
        this.props.getDetails(this.props.photoData.id);
    }

    render () {
        const { photoData } = this.props;

        const classNames = classnames({
            'photo-tile-container': true,
            loading: !photoData.details.id
        });
        
        const _renderDetailedInfo = () => {
            const dateFormatted = photoData.details.dates.taken.substring(0, 10);
            const photoUrl = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`

            return (
                <div>
                    <div 
                        className="photo-tile" 
                        style={{backgroundImage: `url(${photoUrl})`}}
                        onClick={() => {
                            this.props.expandPhoto(photoUrl)
                        }}>
                    </div>
                    <h5 className="card-title">{photoData.details.title._content}</h5>
                    <div className="card-text">
                        <span className="text-info">Author:</span> {photoData.details.owner.username}
                    </div>
                    <div className="card-text">
                        <span className="text-info">Taken on:</span> {dateFormatted}
                    </div>
                    <hr/>
                    <p className="card-text">{photoData.details.description._content}</p>
                </div>
            );
        };
        
        const detailedInfo = photoData.details.id ? _renderDetailedInfo() : <Spinner/>;

        return (
            <div className="col-xs-12 col-md-6 col-lg-3">
                <div className={classNames}>
                    <div className="card">
                        <div className="card-body">        
                            {detailedInfo}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { PhotoTile };

PhotoTile.propTypes = {
    photoData: PropTypes.object,
    getDetails: PropTypes.func,
    expandPhoto: PropTypes.func
};

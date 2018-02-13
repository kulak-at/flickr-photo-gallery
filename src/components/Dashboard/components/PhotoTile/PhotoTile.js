import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PhotoTile extends PureComponent {
    componentWillMount () {
        this.props.getDetails(this.props.photoData.id);
    }

    render () {
        const { photoData } = this.props;
        
        const _renderDetailedInfo = () => {
            return (
                <div>
                    <h5 className="card-title">{photoData.details.title._content}</h5>
                    <div className="card-text">Author: {photoData.details.owner.username}</div>
                    <div className="card-text">Date: {photoData.details.dates.taken}</div>
                    <hr/>
                    <p className="card-text">{photoData.details.description._content}</p>
                </div>
            );
        };
        
        const detailedInfo = photoData.details.id ? _renderDetailedInfo() : <span>Loading</span>;

        return (
            <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="photo-tile-container">
                    <div className="card">
                        <div className="card-body">
                            <div 
                                className="photo-tile" 
                                style={{backgroundImage: `url(https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg)`}}>
                            </div>
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
    getDetails: PropTypes.func
};

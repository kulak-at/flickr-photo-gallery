import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { alertHide } from 'actions/alertActions';

const mapStateToProps = (state) => {
    return {
        alert: state.alert
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHide: () => {
            dispatch(alertHide());
        }
    };
};

class Alert extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const visibilityClass = this.props.alert.message ? '' : 'd-none';

        return (
            <div className={'alert alert-danger alert-dismissible ' + visibilityClass} role="alert">
                <h4 className="alert-heading">An error occured</h4>
                {this.props.alert.message}
                <button type="button" className="close" onClick={this.props.onHide} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

const connectedAlert = connect(mapStateToProps, mapDispatchToProps)(Alert);

export { connectedAlert as Alert };

Alert.propTypes = {
    alert: PropTypes.object,
    onHide: PropTypes.func
};

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top : '50%',
        left : '50%',
        right : 'auto',
        bottom : 'auto',
        marginRight : '-50%',
        transform : 'translate(-50%, -50%)'
    }
};

const PhotoModal = ({isOpen, closeModal, imgPath}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <img src={imgPath} alt="dog"/>
    </Modal>
);

export { PhotoModal };

PhotoModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    imgPath: PropTypes.string
};

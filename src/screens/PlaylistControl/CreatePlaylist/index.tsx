import React, { useState } from 'react';
import { Button, Modal, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faBolt,
  faBoltLightning,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Playlist from '../../../Types/playlist';

import './styles.css';

type PropTypes = {
  getPlaylists: () => void;
  playlists: Playlist[];
};

const CreatePLaylist: React.FC<PropTypes> = ({ getPlaylists, playlists }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>('');

  const onSubmit = () => {
    const date = Date.now();
    localStorage.setItem(
      'playlists',
      JSON.stringify({
        data: [...playlists, { title: playlistName, id: date, songs: [] }],
      })
    );
    setShowModal(false);
    getPlaylists();
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className='bg-dark-2 border-none'>
          <Modal.Title>
            <FontAwesomeIcon icon={faPlus} className='c-green' /> New Playlist
          </Modal.Title>
          <CloseButton variant='white' onClick={() => setShowModal(false)} />
        </Modal.Header>
        <Modal.Body className='bg-dark-2 create-playlist-modal-body'>
          {/* <p>
            <FontAwesomeIcon
              className='c-blue playlists-title-icon'
              icon={faChevronRight}
            />{' '}
            Playlist Name:
          </p> */}
          <input
            className='create-playlist-modal-input'
            type='text'
            placeholder='Playlist Name'
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          ></input>
          <Button
            className='submit-button bg-blue border-none'
            disabled={!playlistName.trim()}
            onClick={onSubmit}
          >
            <FontAwesomeIcon icon={faBoltLightning} className='icon-mr' />
            Create Playlist!
          </Button>
        </Modal.Body>
      </Modal>
      <Button
        className='create-button bg-blue'
        onClick={() => setShowModal((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faCirclePlus} className='icon-mr' />
        New Playlist
      </Button>
    </div>
  );
};

export default CreatePLaylist;

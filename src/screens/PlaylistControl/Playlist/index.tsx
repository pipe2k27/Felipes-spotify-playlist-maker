import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartMusicCameraBolt,
  faChevronDown,
  faTrashAlt,
  faPlus,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import SongType from '../../../Types/song';
import Song from '../Song/index';

type PropTypes = {
  title: string;
  id: string;
  deletePlaylist: (id: string) => void;
  addToPlaylistView: boolean;
  currentSong: SongType | null;
  addSongToPlaylist: (song: SongType, playlistId: string) => void;
  playlistSongs: SongType[];
  removeSongFromPlaylist: (songIndex: number, playlistId: string) => void;
};

const Playlist: React.FC<PropTypes> = ({
  title,
  id,
  deletePlaylist,
  addToPlaylistView,
  currentSong,
  addSongToPlaylist,
  playlistSongs,
  removeSongFromPlaylist,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickPlaylist = () => {
    if (addToPlaylistView && currentSong) {
      addSongToPlaylist(currentSong, id);
      setIsOpen(true);
    }
    if (!addToPlaylistView) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className='playlist-wrapper'>
      <div
        className={`playlist-entry ${
          !addToPlaylistView ? 'bg-dark-2' : 'bg-dark playlist-entry-add'
        }`}
        onClick={onClickPlaylist}
      >
        <div className='playlist-title-grid'>
          <FontAwesomeIcon
            className='playlist-icon c-blue'
            icon={
              !addToPlaylistView ? faHeartMusicCameraBolt : faCircleChevronRight
            }
          />
          <span className='playlist-title'>
            {title} <span className='playlist-by'> / By Felipe Perarnau</span>
          </span>
        </div>
        {!addToPlaylistView && (
          <div>
            <FontAwesomeIcon
              className='playlist-delete c-blue'
              icon={faTrashAlt}
              onClick={() => deletePlaylist(id)}
            />
            <FontAwesomeIcon
              className='playlist-chevron c-green'
              icon={faChevronDown}
            />
          </div>
        )}
        {addToPlaylistView && (
          <div className='add-to-playlist'>
            <FontAwesomeIcon
              className='playlist-chevron c-green'
              icon={faPlus}
            />{' '}
            Add
          </div>
        )}
      </div>
      {isOpen && playlistSongs && playlistSongs.length > 0 && (
        <div className='open-playlist-wrapper'>
          {playlistSongs.map((song: SongType, index) => (
            <Song
              song={song}
              songIndex={index}
              removeSongFromPlaylist={removeSongFromPlaylist}
              playlistId={id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;

import React from 'react';
import SongType from '../../../Types/song';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faTimes } from '@fortawesome/free-solid-svg-icons';

type PropTypes = {
  song: SongType;
  songIndex: number;
  removeSongFromPlaylist: (songIndex: number, playlistId: string) => void;
  playlistId: string;
};

const Song: React.FC<PropTypes> = ({
  song,
  songIndex,
  removeSongFromPlaylist,
  playlistId,
}) => {
  const removeSong = () => {};

  return (
    <div className='song-entry bg-black'>
      <div className='song-box-1'>
        <img src={song.image} alt='album' className='song-album' />
        <p className='song-data'>
          <p className='song-title'>{song.title}</p>
          <p className='song-artist'>/By {song.artist}</p>
        </p>
        <FontAwesomeIcon className='playlist-icon c-blue' icon={faMusic} />
      </div>
      <div className='song-box-2'>
        <FontAwesomeIcon
          className='playlist-icon c-blue icon-remove'
          icon={faTimes}
          onClick={() => removeSongFromPlaylist(songIndex, playlistId)}
        />
      </div>
    </div>
  );
};

export default Song;

import React, { useEffect, useState } from 'react';
import Playlist from './Playlist';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartMusicCameraBolt,
  faChevronRight,
  faEyeDropperEmpty,
} from '@fortawesome/free-solid-svg-icons';
import CreatePLaylist from './CreatePlaylist';
import PlaylistType from '../../Types/playlist';
import Song from '../../Types/song';

type PropTypes = {
  addToPlaylistView: boolean;
  currentSong: Song | null;
  setAddToPlaylistView: (bool: boolean) => void;
};

const PlaylistControl: React.FC<PropTypes> = ({
  addToPlaylistView,
  currentSong,
  setAddToPlaylistView,
}) => {
  const [playlists, setPlayLists] = useState<PlaylistType[]>([]);

  const getPlaylists = () => {
    const data = window.localStorage.getItem('playlists');
    if (data) {
      const localPlaylists = JSON.parse(data);
      setPlayLists([...localPlaylists.data]);
    }
  };

  const addSongToPlaylist = (song: Song, playlistId: string) => {
    if (currentSong && playlistId) {
      const data = window.localStorage.getItem('playlists');
      if (data) {
        const localPlaylists = JSON.parse(data);
        const newPlaylists = localPlaylists.data;
        const indexToAddSong = newPlaylists.findIndex(
          (e: PlaylistType) => e.id === playlistId
        );
        if (indexToAddSong !== -1) {
          const playlistSongs = newPlaylists[indexToAddSong].songs;
          playlistSongs.push(song);
          newPlaylists[indexToAddSong].songs = playlistSongs;
        }
        localStorage.setItem(
          'playlists',
          JSON.stringify({ data: [...newPlaylists] })
        );
        setPlayLists([...newPlaylists]);
        setAddToPlaylistView(false);
      }
    }
  };

  const removeSongFromPlaylist = (songIndex: number, playlistId: string) => {
    if (songIndex > -1 && playlistId) {
      const data = window.localStorage.getItem('playlists');
      if (data) {
        const localPlaylists = JSON.parse(data);
        const newPlaylists = localPlaylists.data;
        const PlaylistToRemoveSongIndex = newPlaylists.findIndex(
          (e: PlaylistType) => e.id === playlistId
        );
        if (PlaylistToRemoveSongIndex !== -1) {
          const playlistSongs = newPlaylists[PlaylistToRemoveSongIndex].songs;
          playlistSongs.splice(songIndex, 1);
          newPlaylists[PlaylistToRemoveSongIndex].songs = playlistSongs;
        }
        localStorage.setItem(
          'playlists',
          JSON.stringify({ data: [...newPlaylists] })
        );
        setPlayLists([...newPlaylists]);
      }
    }
  };

  const deletePlaylist = (id: string) => {
    const data = window.localStorage.getItem('playlists');
    if (data) {
      const localPlaylists = JSON.parse(data);
      const newPlaylists = localPlaylists.data;
      const indexToDelete = newPlaylists.findIndex(
        (e: PlaylistType) => e.id === id
      );
      if (indexToDelete !== -1) {
        newPlaylists.splice(indexToDelete, 1);
      }
      localStorage.setItem(
        'playlists',
        JSON.stringify({ data: [...newPlaylists] })
      );
      setPlayLists([...newPlaylists]);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className='bg-dark plapylist-control-scroll'>
      <div className='playlist-wrapper'>
        <div className='playlist-wrapper-top-box'>
          <h2 className='playlists-title'>
            <FontAwesomeIcon
              className='c-blue playlists-title-icon'
              icon={faChevronRight}
            />{' '}
            Your Playlists:
          </h2>
          <CreatePLaylist getPlaylists={getPlaylists} playlists={playlists} />
        </div>
        {addToPlaylistView && (
          <div className='select-playlist-message'>
            Select playlist to add current song:
          </div>
        )}
        {playlists.length > 0 ? (
          playlists.map((element) => (
            <Playlist
              title={element.title}
              id={element.id}
              deletePlaylist={deletePlaylist}
              addToPlaylistView={addToPlaylistView}
              currentSong={currentSong}
              addSongToPlaylist={addSongToPlaylist}
              playlistSongs={element.songs}
              removeSongFromPlaylist={removeSongFromPlaylist}
            />
          ))
        ) : (
          <div>
            <FontAwesomeIcon
              icon={faHeartMusicCameraBolt}
              className='font-xl c-blue my-4'
            />
            <p className='my-2'>You currently have no Playlists</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistControl;

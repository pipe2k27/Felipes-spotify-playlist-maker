import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './styles.css';
import { useInterval } from 'usehooks-ts';
import PlaylistControl from '../PlaylistControl';
import Image from '../../components/Image';
import Song from '../../Types/song';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faCircleCheck,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const spotifyApi = new SpotifyWebApi({
  clientId: '6018613b8bab45df83ab2c83bbf09d69',
});

type PropsType = {
  accessToken: string | null;
};

const Player: React.FC<PropsType> = ({ accessToken }) => {
  const [currentPlayingTrack, setCurrentPlayingTrack] =
    useState<Song | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [addToPlaylistView, setAddToPlaylistView] = useState<boolean>(false);

  const getCurrentPlayingTrack = async () => {
    const res: any = await spotifyApi.getMyCurrentPlayingTrack();
    if (!res.body) {
      setCurrentPlayingTrack(null);
      return;
    }
    setProgress(res.body.progress_ms);
    if (
      currentPlayingTrack &&
      res.body.item.name === currentPlayingTrack.title
    ) {
      return;
    }
    const track: Song = {
      title: res.body.item.name,
      image: res.body.item.album.images[0].url,
      artist: res.body.item.artists[0].name,
      duration: res.body.item.duration_ms,
    };
    setCurrentPlayingTrack(track);
  };
  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      getCurrentPlayingTrack();
    }
  }, []);

  // Use interval hook allows for access to state
  useInterval(() => {
    if (accessToken) {
      getCurrentPlayingTrack();
    }
  }, 1000);

  const millisToMinutesAndSeconds = (millis: number) => {
    const date = new Date(millis);
    const seconds = date.getSeconds();
    return `${date.getMinutes()}:${
      seconds < 10 ? '0' : ''
    }${date.getSeconds()}`;
  };

  return (
    <div className='main-app-grid'>
      <div className='player-wrapper gradient-blue'>
        {currentPlayingTrack && (
          <div className='player-top-box'>
            <h2 className='player-title'>
              <FontAwesomeIcon
                className='c-blue playlists-title-icon'
                icon={faChevronRight}
              />{' '}
              Song playing:
            </h2>
            <Button
              className={`player-add-button ${
                !addToPlaylistView ? 'bg-green' : 'bg-blue'
              }`}
              onClick={() => {
                setAddToPlaylistView((prev) => !prev);
              }}
            >
              <FontAwesomeIcon
                className='icon-mr'
                icon={!addToPlaylistView ? faCircleCheck : faArrowRight}
              />{' '}
              {!addToPlaylistView && 'Add to a PLaylist'}
            </Button>
          </div>
        )}
        {currentPlayingTrack && (
          <div className='player-box'>
            <img
              src={currentPlayingTrack.image}
              alt='pic'
              className='player-cover'
            />
            <div className='player-time-grid'>
              <h2 className='player-title-song'>{currentPlayingTrack.title}</h2>
              <div>
                {millisToMinutesAndSeconds(progress)} /{' '}
                {millisToMinutesAndSeconds(currentPlayingTrack.duration)}
              </div>
            </div>
            <p className='player-artist'>{currentPlayingTrack.artist}</p>
          </div>
        )}
        {!currentPlayingTrack && (
          <div>
            <Image src='no-music.png' className='player-cover' />
            <h2>No song playing!</h2>
            <p>Play a song on spotify to view it!</p>
          </div>
        )}
      </div>
      <PlaylistControl
        addToPlaylistView={addToPlaylistView}
        currentSong={currentPlayingTrack}
        setAddToPlaylistView={setAddToPlaylistView}
      />
    </div>
  );
};

export default Player;

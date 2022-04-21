import React from 'react';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=6018613b8bab45df83ab2c83bbf09d69&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

// This screen will allow users to log in to their spotify accounts

const SignIn: React.FC = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <h2>Welcome to Spotify's Playlist Maker</h2>
      <p>Please log in to your spotify account to begin:</p>
      <a className='btn btn-success btn-lg' href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  );
};

export default SignIn;

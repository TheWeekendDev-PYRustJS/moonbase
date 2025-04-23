import React from 'react';
import useSound from 'use-sound';
import backgroundMusic from '../assets/Moonwatch.mp3'
import "../styles.css"; // Import CSS for styling


const Home = () => {
    const [play, { stop, isPlaying }] = useSound(backgroundMusic, {loop: false});

    return (
        <div className="home-container">
            {/* Sci-Fi Banner */}
            <div className="banner">
                <h1>The Moon</h1>
                    <button onClick={isPlaying ? stop : play}>
                        {isPlaying ? 'Stop Music' : 'Play Music'}
                    </button>
            </div>

        </div>
    );
}

export default Home;


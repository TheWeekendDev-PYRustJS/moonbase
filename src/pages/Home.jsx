import React from 'react';
import useSound from 'use-sound';
import backgroundMusic from '../assets/Moonwatch.mp3'
import "../styles.css"; // Import CSS for styling


const Home = () => {
    const [play, { stop }] = useSound(backgroundMusic, {loop: false});

    return (
        <div className="home-container">
            {/* Sci-Fi Banner */}
            <div className="banner">
                <h1>The Moon</h1>
                <button onClick={() => play()}>Play</button>
                <button onClick={() => stop()}>Stop</button>
            </div>

        </div>
    );
}

export default Home;


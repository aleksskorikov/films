import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
    const [playing, setPlaying] = useState(false);

    return (
        <div>
        <ReactPlayer
            url={url}
            playing={playing}
            controls
            width="100%"
            height="100%"
            onError={() => console.error('Video playback error')}
        />
        <button onClick={() => setPlaying(!playing)}>
            {playing ? 'Пауза' : 'Воспроизвести'}
        </button>
        </div>
    );
};

export default VideoPlayer;
// import React from 'react';
// import ReactPlayer from 'react-player';

// const VideoPlayer = ({ url }) => {
//     return (
//         <div>
//             <ReactPlayer url={url} playing controls />
//         </div>
//     );
// };

// export default VideoPlayer;

import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const TVShow = () => {
    const { videoUrl } = useParams();
    console.log(videoUrl);
    return (
        <div className='pleer'>
            <ReactPlayer  url={videoUrl} playing controls />
        </div>
    );
};

export default TVShow;



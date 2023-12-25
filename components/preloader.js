import { TypeAnimation } from 'react-type-animation';
import { logo_url } from '@config'

export default function Preloader(){
    return(
        <>
        <div className="preloader" id="preloadsd">
            <div className="iconpreloader">
                {/* You can use an SVG or an image here */}
                <img src={logo_url} alt="Avidia" />
            </div>
            <div className="loading-bar">
                <div className="loading-progress"></div>
            </div>
            <br/>
            <br/>
            <div className="preloadertext">
            <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'KarmaPay, any payment gateway',
    1000,
    'KarmaPay, unified API',
    1000,
    'KarmaPay, unified stats',
    1000,
  ]}
  speed={90}
  style={{ fontSize: '2em', color: 'black' }}
  repeat={Infinity}
/>
</div>
        </div>
        </>
        )
}
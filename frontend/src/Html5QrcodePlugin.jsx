import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import styled from 'styled-components';

const qrcodeRegionId = "my-qr-reader";

const QrReaderWrapper = styled.div`
  padding: 20px;
  border: 1.5px solid #b2b2b2;
  border-radius: 8px;
  
  img[alt="Info icon"] {
    display: none;
  }
  
  img[alt="Camera based scan"] {
    width: 100px;
    height: 100px;
  }
  
  button {
    padding: 10px 20px;
    border: 1px solid #b2b2b2;
    outline: none;
    border-radius: 0.25em;
    color: white;
    font-size: 15px;
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 10px;
    background-color: #3D96FF;
    transition: 0.3s background-color;
    
    &:hover {
      background-color: #2066b6;
    }
  }

  a {
    text-decoration: none;
    color: #1d9bf0;
  }
  
  video {
    width: 100%;
    border: 1px solid #b2b2b2;
    border-radius: 0.25em;
  }
`;

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) { 
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {

    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <QrReaderWrapper id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;
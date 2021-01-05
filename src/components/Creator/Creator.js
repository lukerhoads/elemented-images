import React, { useState, useRef, useEffect } from 'react'
import './Creator.css'

const Creator = () => {
    useEffect(() => {
        setError('')
    }, [])

    const [error, setError] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [shareLink, setShareLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const widthRef = useRef('')
    const heightRef = useRef('')
    const textRef = useRef('')
    const colorRef = useRef('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (validateResults()) {
            setIsLoading(true)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("key", process.env.REACT_APP_GOOGLE_API_KEY);
            urlencoded.append("width", widthRef);
            urlencoded.append("height", heightRef);
            urlencoded.append("text", textRef);
            if (colorRef === '') {
                urlencoded.append("color", 'default');
            } else {
                urlencoded.append("color", colorRef);
            }

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(process.env.REACT_APP_GATEWAY_URL, requestOptions)
                .then(response => {
                    setIsLoading(false)
                    setImageLink(response.link)
                    setShareLink(`https://twitter.com/intent/tweet?url=${imageLink}/&text=Check out this image I made with the help of @ElementedImages!#Clean`)
                })
                .catch(error => {
                    setIsLoading(false)
                    setError('Error fetching image properties.')
                });
        }
    }

    const validateResults = () => {
        let width = parseInt(widthRef.current.value)
        let height = parseInt(heightRef.current.value)
        if (isNaN(width) || isNaN(height)) {
            setError('Width/height values need to be a number.')
            return false;
        }
        if (width > 3000 || height > 3000 || width < 100 || height < 100) {
            setError('Width/height values need to be 100<x<3000.')
            return false;
        }
        if (textRef.current.value.length > 20) {
            setError('Text input must be 20 characters max.')
            return false;
        }
        if (!['red', 'green', 'blue', 'orange', 'purple', 'yellow', ''].includes(colorRef.current.value)) {
            setError('Color input must be red, green, blue, orange, purple, or yellow.');
            return false;
        }
        return true;
    }

    return (
        <div className="creator-container">
            <div className="input-container">
                <h3>Dimensions</h3>
                <div className="input-positioner">
                    <input placeholder="Width (px)" ref={widthRef} className="first-input" />
                    <input placeholder="Height (px)" ref={heightRef} />
                </div>

                <h3>Text</h3>
                <div className="input-positioner">
                    <input placeholder="Example Text (Max 20 Characters)" ref={textRef} />
                </div>

                <h3>Incorporated Colors (Optional)</h3>
                <div className="input-positioner">
                    <input placeholder="Color theme (red, green, blue)" ref={colorRef} />
                </div>

                <div className="input-positioner">
                    <button onClick={onSubmit}>Generate Image</button>
                </div>

                <p>{error ? error : ''}</p>
                
            </div>
            <div className="result-container">
                { isLoading ? (
                    <img src={`${window.location.origin}/images/loadgif.gif`} alt="loader" className="loadergif" />
                ) : (
                    ''
                )}

                { imageLink ? (
                    <>
                        <img alt="result" src={imageLink} id="result-image" />
                        <div className="image-actions-container">
                            <div className="input-positioner">
                                <a id="download-button">Download</a>
                                <a href={shareLink}>Share</a>
                            </div>
                        </div>
                    </>
                ) : (
                    ''
                )}
                
                
            </div>
        </div>
    )
}

export default Creator;
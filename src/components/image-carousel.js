import React, {useState} from "react";
import Img from "gatsby-image"


function ImageCarousel({images}) {
    const [index, setIndex] = useState(0)

    // Minus 1 for array offset from 0
    const length = images.length - 1
    const handleNext = () =>
        index === length ? setIndex(0) : setIndex(index + 1);
    const handlePrevious = () =>
        index === 0 ? setIndex(length) : setIndex(index - 1)

    const {node} = images[index]
    return (
        <div>
            <div>
                <Img
                    fluid={node.childImageSharp.fluid}
                    key={node.id}
                    alt={splitFilename(node.absolutePath)}
                />
            </div>
            <div>
                <button onClick={() => handlePrevious()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>
            </div>
        </div>
    )
}

const splitFilename = (path) => {
    return (path.split('\\').pop().split('/').pop().split('.'))[0];
}

export default ImageCarousel;


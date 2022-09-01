import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

//we import some normal packages, React, Link and also urlFor which is the function which get us the image url.


/* HeroBanner renders:
a <div> tag as a container of the banner that contains:
  a <div> tag which contains:
    a <p> tag with a small text
    a <h3> tag with a mid text
    a <h1> tag with a large text
    a image
    a <link> tag (next component we import) that contains a button.
    a <div> tag that contains a <h5> with a description ttitle and a <p> tag with the description text.

all the information for these tags is passed through the heroBaner props, which comes from the index page,
which calls the data from the database (bannerData).

*/

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
      
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
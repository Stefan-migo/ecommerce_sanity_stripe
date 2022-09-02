import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

//we import some normal packages, React, Link and also urlFor which is the function which get us the image url.

/* Product component will render:
a <div> tag that contains:
  a <link> tag (next component, whatever is inside the link tag will be linked to the href we set up) that contains:
    a <div> tag that works as a container for the product card. and it contains:
      a image.
      a <p> tag with the product name.
      a <p> tag with the product price.

All the data has been passed through the product property which comes from the index page,
this property calls the data from the database.
*/
const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
            alt='product-image'
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
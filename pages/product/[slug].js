/* 
[Slug] component is a dynamic component, as it is wrapped by [], it means it will be a page component for any product we create.
each product we create has its own slug. also the <Link> component within product component, is redirecting the card's product to this specific slug "./product/[slug]"
that means this dynamic component will be render for each product we have added to the database. 
*/

//import some common packages as React, useState, and some icons.
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

//import the database's conection components. 
import { client, urlFor } from '../../lib/client';
//import the product's card component.
import { Product } from '../../components';
//import useStateContext as a
import { useStateContext } from '../../context/StateContext';


//ProductDetails component will take as props product and products, they both comes from the getStaticProps/getStaticPaths functions
//product is the specific item that matches with the slug we are calling in the path url.
//products are all the items within the product schema of the database.
const ProductDetails = ({ product, products }) => {
  //destructure the props from product
  const { image, name, details, price } = product;
  //create a state index and set it equals to 0, also set the function setIndex in order to modify it in the future.
  //this index state will work for the images array, when we have more than one image per product. so we can create a image carrousel.
  const [index, setIndex] = useState(0);
  //destructure props coming from useStateContext.
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  
  //create a handleBuyNow function. It will call the function onAdd(from useStateContext), setting as properties (product and qty)
  //it alse will change the state of showCart to true.
  const handleBuyNow = () => {
    onAdd(product, qty);
 
    setShowCart(true);
  }

  /* ProductDetails will render:
  a <div> tag that works as a container for the page.
    within this div we will have two big divs. 
    first div will be product-detail-container. this will contain two <img> tags wrapped by their own divs, it will also have a description div.
        first <img> tag will be the main image, as per product we can have more than one image,
        the one displayed will be the image that matches with the index set up. -> {urlFor(image && image[index])}  
        second <img> tag will be the carousel, so first we will map the image array in order to get a <img> for each
        image we have for that product.
        Description div will contain all the tags in order to create the description of the product.
            as title, 
            reviews(stars icons and <p> tag with a number of reviews)
            details title (<h4>), and details description (<p>)
            price (<p>)
            Quantity section (quantity string <p>  minusButton(<span>) number(<span) and plusButton(<span>). 
            add to cart button <button> with an onClick key which runs the onAdd function from (useStateContext)
            buy button <button> with an onClick key which runs the handleBuyNow function.
    second div will be maylike-products-wrapper. it will contain:
        a you may also like string (<h2>)
        a marquee div (i think it is the moving carousel) this div contains:
            a div that contains a <Product /> component(Products'card) in this div we wiil map the 'products' 
            props that comes from the seStacticProps function and it will create a card for each product.

  */
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" alt='product-detail' />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i} //key will be index, so for each item within the array we will have an img tag
                src={urlFor(item)} //the image displayed will be the one that belongs to the index
                //if the i(index within the array) matches with the index state, it will have a special style that shows which image is being displayed on the main image container.
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}//every time the mouse enter to the img tag it will change the index state with the setIndex to the index of the array. 
                alt='product small image'
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

// StaticPaths
/*
getStaticPaths() is required for dynamic SSG(static site generation) pages
using that function, next.js will statically pre-render all the paths specified by the function.
so we are pre-rendering all the paths we will use in the function getStaticProps.
We are just creating paths... ./pages/Product/[slug].js where slug will change thanks this function.
 
  call getStaticsPaths as an async function.
  set a variable 'query' which will look for the current slug of a product.
    the 'query' will search into the product schema, for all the items created and it will fetch the current slug of each of them.  

  then we fetch the data creating a products var, calling a 'client' function with its fetch method, which will use the 'query' var as a property
    just a this point we will get the data we request from the database. in this case the current slug of all the items into the product schema.

  then we create a paths var which will map the array of products we get from the database. 
    the map will get us a params object with the slug of each item we fetch from the database  
    basically we will separate each current slug within a new array.


  getStaticPaths will return a params object and a fallback.
    finally we return the paths var(params object) and a fallback.
    the paths param contains all the paths we pre-render, so each product will have an specific path.

*/ 
export const getStaticPaths = async () => { 
  const query = `*[_type == "product"] { 
    slug {
      current
    }
  }
  `;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}


//StaticProps
/* 
getStaticProps(SSG) will pre-render a page at build time, using the props returned from the function.
getStaticProps is executed by the server side. that means you can write server-side code directly in this function.
  
  we set up as a context key of the function (params: {slug})
  params key contains the route parameters for pages using dynamic routes.
  params key must be use together with getStaticPaths. becase paths variable will create the url path for the current page. giving a different slug each time its called
  the params {slug} refers to the current page we are working on ([slug].js), and it will pre-render a specific page for each element with a different slug.

  we call the getStaticProps as an async function, and we set the context
  we create a query(call) variable. which will look inside of the product schema for the current slug that matches with the [slug] coming from the params(let's say /pages/Products/[slug]) 
  we create a second query(call) variable. this will call for all the items inside the product schema.
  then we fetch both querys with the client function and its fetch method, using the querys' variables as properties.

  getStaticProps returns props, these can be passed as props to the page component ([slug].js)
  this props contains the data we are requesting to the database.
  */

  export const getStaticProps = async ({ params: { slug }}) => { 
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  
  return {
    props: { products, product }
  }
}

export default ProductDetails;


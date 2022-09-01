import React from 'react'
import { HeroBanner, Footer, FooterBanner, Layout, Navbar, Product, Cart} from '../components';
import { client } from '../lib/client';


const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>  
      </div>

      <div className='products-container'>
        {products.map((product)=> 
          <Product 
            key={product._id}
            product={product}
          /> 
        )}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
    
  )
}


// next.js way to fetch data from an API (database)
// this is an async function.
export const getServerSideProps = async () => {
  //we create a query(call) for the schema we want to fetch
  const query = '*[_type == "product"]';
  //then we fetch the data, creating a variable that contains the client function with a fetch method, which calls the data from the schema we want to get (using as property the query call).
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  //whatever getServerSideProps returns gets populated in our function.
  //so whatever is returned we can use ir in our main function(home), and get all that data in our app.
  return {
    props: { products, bannerData}
  }
}

export default Home;
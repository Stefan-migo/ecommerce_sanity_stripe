//import some normal packages as React and Head
//head is the equivalent to head on html, so where the metadata goes.
import React from 'react';
import Head from 'next/head';

//also import some components we have created as Navbar and Footer. 
import Navbar from './Navbar';
import Footer from './Footer';


/* this Layout component renders:
  a <div> tag which works as a container. 
    a <Head> tag (next copmonent) which contains a <title> tag with the page name
    a <header> tag which contains the <Navbar /> component we have created.
    a <main> tag which works as a container (sort of body tag), it contains the {children} property
      {children} property displays whatever the main component is wrapping up (Layout component in this case)
    a <footer> tag which contains the <Footer /> component we have created.
*/
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Sound Tech Store</title>
        <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg"/>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
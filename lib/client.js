
// let's create the sanity client.
// import some packages from the sanity framework
import sanityClient from '@sanity/client';
import urlForImage from '@sanity/image-url';

//create and export the client. as a js variable which use the sanityClient function from sanity packages
//the client is the variable which allows us to connect with the database.
//so all the properties we need, they are in our sanity profile.
export const client = sanityClient({
    projectId:'vn9fzedd',
    dataset:'production',
    apiVersion:'2022-08-28', //it seems to be that the version is just the date when you are creating the app.
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, //just to keep the token secured, we create a .env document where we set the token.
    ignoreBrowserTokenWarning: true
});

//we create a variable that calls the urlForImage function, that takes as property the client(connection with the database).
const builder = urlForImage(client);

//so we export a function that takes as property a source(we set that source when we use the function)
//this function will run the builder function to get the image we need.
export const urlFor = (source) => builder.image(source)
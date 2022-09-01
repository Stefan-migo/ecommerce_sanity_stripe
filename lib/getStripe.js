//here we create an instance to a stripe promise.

//we import loadStripe package from stripejs framework
import { loadStripe } from '@stripe/stripe-js';

//create an undefined variable
let stripePromise;

//getStripe component
/* 
if stripePromise doesn't exist, set stripePromise equals to: 
    call the function loadStripe, and give it as property the stripe publishable key.
*/
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
}

export default getStripe;
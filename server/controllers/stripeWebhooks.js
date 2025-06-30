import stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async(req, res)=>{
     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
     const sig = req.headers["stripe-signature"];
     let event;
     try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
     } catch (error) {
        return res.status(400).send(`webhook Error: ${error.message}`);
     }

     try {
        switch(event.type){
             case "payment_intent.succeeded":{
                const paymentIntent = event.data.object;
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })

                const session = sessionList.data[0];
                const {bookingId} = session.metadata;

                await Booking.findByIdAndUpdate(bookingId,{
                    isPaid:true,
                    paymentLink: ""
                })
                break;
             }
             default:
                console.log("unhandled event type:", event.type);
                
        }
        res.json({received:true})
     } catch (error) {
        console.error("webhook processing error", error);
        res.status(500).send("Internal Server Error")
        
     }
}
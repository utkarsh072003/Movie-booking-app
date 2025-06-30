import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import sendEmail from "../config/nodeMailer.js";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    { event: 'clerk/user.created'},
    async({event})=>{
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData ={
            _id:id,
            email:email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData)
        
    })
// inngest function to deleta user from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    { event: 'clerk/user.deleted'},
    async({event})=>{
        
        const {id}= event.data
        await User.findByIdAndDelete(id)
    })

// inngest function to update user from database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    { event: 'clerk/user.updated'},
    async({event})=>{
        const {id, first_name, last_name, email_addresses, image_url} = event.data
         const userData ={
            _id:id,
            email:email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.findByIdAndUpdate(id, userData)
    })

  // inngest function to cancel booking and release seats of show after 10 minutes of booking created if payment is not made   

  const releaseSeatsandDeletebooking = inngest.createFunction(
    {id: 'release-seats-delete-booking'},
    {event: "app/checkpayment"},
    async({event, step})=>{
        const tenMinutesLater = new Date(Date.now() + 10*60*1000);
        await step.sleepUntil('wait-for-10-minutes', tenMinutesLater)

        // if payment is not made release seats and delete booking
        await step.run('check-payment-status', async()=>{
            const bookingId = event.data.bookingId;
            const booking = await Booking.findById(bookingId);

            if(!booking.isPaid){
                const show = await Show.findById(booking.show)
                booking.bookedSeats.forEach((seat)=>{
                    delete show.occupiedSeats[seat];
                });
                show.markModified('occupiedSeats');
                await show.save()

                await Booking.findByIdAndDelete(booking._id)
            }
        })
    }
  )

  // inngest function to send email when user books a show
  const sendBookingConfirmationEmail = inngest.createFunction(
    {id: "send-booking-confirmation-email"},
    {event: "app/show.booked"},
    async({event, step})=>{
        const {bookingId} = event.data;
        const booking = await Booking.findById(bookingId).populate({
            path:'show',
            populate:{path:"movie", model:"Movie"}
        }).populate('user');

        await sendEmail({
          to: booking.user.email,
          subject:`Payment Confirmation: "${booking.show.movie.title} booked!"`,
          body: `<div style ="font-family: Arial, sans-serif; line-height:1.5;">
                 <h2> Hi ${booking.user.name},</h2>
                 <p>Your booking for <strong style="color:#E84565;">
                 "${booking.show.movie.title}"</strong> is confirmed. </P>
                 <p>
                    <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US',{
                        timeZone: 'Asia/Kolkata'
                    })} <br/>
                    <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US',{
                        timeZone: 'Asia/Kolkata'
                    })} 
                 </p>
                 <P>Enjoy the show! </p>
                 <P>Thanks for booking with us!<br/>- QuickShow Team</p>
          </div>`
        })
    }
  )

// inngest  function to send notification when a new show is added
const sendNewShowNotification = inngest.createFunction(
    {id: "send-new-show-notification"},
    {event: "app/show.added"},
    async({event})=>{
        const {movieTitle, movieId} = event.data;

        const users = await User.find({});
        for(const user of users){
             const userEmail = user.email;
             const userName = user.name;

             const subject = `New Show Added: ${movieTitle}`;
             const body = `<div style="font-family: Arial, sans-serif; padding:20px">
                        <h2>Hi ${userName} , </h2>
                        <p> We've just added a new show to our library:</p>
                        <h3 style="color:#F84565;"> "${movieTitle}"</h3>
                        <p> Visit our website</p>
                        <br/>
                        <p> Thanks, <br/>QuickShow Team</p>
             </div>`;

           await sendEmail({
            to: userEmail,
            subject,
            body,
         })
        }
           
        return {message:"Notification sent"}
        
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeatsandDeletebooking, sendBookingConfirmationEmail, sendNewShowNotification];

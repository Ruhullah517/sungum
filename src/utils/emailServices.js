const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendConfirmationEmail = async (booking) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "ruhu.vaxir007@gmail.com",
            subject: 'Room Booking Confirmation',
            html: `
               <h1>Booking Confirmed!</h1>
               <p>Dear ${booking.booked_by},</p>
               <p>Your room booking has been confirmed for Room ${booking.room_number}.</p>
               <p>Check-in: ${booking.checkin_date}</p>
               <p>Check-out: ${booking.checkout_date}</p>
               <p>Total Amount: Rs.${booking.total_payment}</p>
               <p>Payment Status: ${booking.payment_status}</p>
               <br>
               <p>Thank you for choosing our hotel!</p>
           `
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
};
const sendRejectionEmail = async (booking) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: booking.email,
            subject: 'Room Booking Request Rejected',
            html: `
               <h1>Booking Request Rejected</h1>
               <p>Dear ${booking.booked_by},</p>
               <p>We regret to inform you that your room booking request for Room ${booking.room_number} has been rejected.</p>
               <p>If you have any questions, please contact us.</p>
           `
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    sendConfirmationEmail,
    sendRejectionEmail
};
const db = require('../config/database');

const EventPayment = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM EventPayments');
        return rows;
    },
    create: async (data) => {
        const { booking_id, event_name, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, remaining_amount, payment_status } = data;
        const [result] = await db.query(
            `INSERT INTO EventPayments (booking_id, event_name, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, remaining_amount, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [booking_id, event_name, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, remaining_amount, payment_status]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const {
            event_name,
            booked_by,
            account_title,
            account_number,
            payment_date,
            total_payment,
            paid_amount,
            remaining_amount,
            payment_status,
        } = data;

        await db.query(
            `UPDATE EventPayments
       SET event_name = ?, booked_by = ?, account_title = ?, account_number = ?, payment_date = ?, total_payment = ?, paid_amount = ?, remaining_amount = ?, payment_status = ?
       WHERE id = ?`,
            [
                event_name,
                booked_by,
                account_title,
                account_number,
                payment_date,
                total_payment,
                paid_amount,
                remaining_amount,
                payment_status,
                id,
            ]
        );
    },
};
module.exports = EventPayment;

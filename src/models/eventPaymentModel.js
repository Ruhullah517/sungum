const db = require('../config/database');

const EventPayment = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM EventPayments');
        return rows;
    },
    create: async (data) => {
        const {
            event_name,
            booked_by,
            account_title,
            account_number,
            payment_date,
            total_payment,
            paid_amount,
            payment_status,
            email,
            phone,
            cnic,
            booked_date,
            time,
            no_of_guests,
            menu, // This should now be a JSON array
            custom_stage,
        } = data;

        const [result] = await db.query(
            `INSERT INTO EventPayments 
             (event_name, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, payment_status, email, phone, cnic, booked_date, time, no_of_guests, menu, custom_stage) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [event_name, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, payment_status, email, phone, cnic, booked_date, time, no_of_guests, JSON.stringify(menu), custom_stage]
        );

        return result.insertId;
    },
    update: async (id, data) => {
        const { payment_date, paid_amount, payment_status } = data;

        await db.query(
            `UPDATE EventPayments 
           SET payment_date = ?, paid_amount = ?, payment_status = ?, time = ?
           WHERE id = ?`,
            [payment_date, paid_amount, payment_status, id]
        );
    },
    delete: async (id) => {
        await db.query('DELETE FROM EventPayments WHERE id = ?', [id]);
    },
};
module.exports = EventPayment;

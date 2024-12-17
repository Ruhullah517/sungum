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
            menu,
            custom_stage,
        } = data;

        const [result] = await db.query(
            `INSERT INTO EventPayments 
             (event_name, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, payment_status, email, phone, cnic, booked_date, time, no_of_guests, menu, custom_stage) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
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
                time, // "morning" or "evening"
                no_of_guests,
                menu, // "Yes" or "No"
                custom_stage, // "Yes" or "No"
            ]
        );

        return result.insertId;
    },
    update: async (id, data) => {
        const { payment_date, paid_amount, payment_status, time, menu, custom_stage } = data;

        await db.query(
            `UPDATE EventPayments 
             SET payment_date = ?, paid_amount = ?, payment_status = ?, time = ?, menu = ?, custom_stage = ?
             WHERE id = ?`,
            [payment_date, paid_amount, payment_status, time, menu, custom_stage, id]
        );
    },
    delete: async (id) => {
        await db.query('DELETE FROM EventPayments WHERE id = ?', [id]);
    },
};

module.exports = EventPayment;

const db = require('../config/database');

const RoomPayment = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM RoomPayments');
        return rows;
    },
    create: async (data) => {
        const { booking_id, room_number, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, remaining_amount, payment_status } = data;
        const [result] = await db.query(
            `INSERT INTO RoomPayments (booking_id, room_number, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, remaining_amount, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [booking_id, room_number, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, remaining_amount, payment_status]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const {
            room_number,
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
            `UPDATE RoomPayments
           SET room_number = ?, booked_by = ?, account_title = ?, account_number = ?, payment_date = ?, total_payment = ?, paid_amount = ?, remaining_amount = ?, payment_status = ?
           WHERE id = ?`,
            [
                room_number,
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
module.exports = RoomPayment;

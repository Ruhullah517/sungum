const db = require('../config/database');

const RoomPayment = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM RoomPayments');
        return rows;
    },
    create: async (data) => {
        const {
            room_number,
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
            checkin_date,
            checkout_date } = data;
        const [result] = await db.query(
            `INSERT INTO RoomPayments (
            room_number,
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
             checkin_date,
             checkout_date)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`,
            [room_number, booked_by, account_title, account_number, payment_date, total_payment, paid_amount, payment_status, email, phone, cnic, checkin_date, checkout_date]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const { payment_date, paid_amount, payment_status } = data;

        await db.query(
            `UPDATE RoomPayments 
           SET payment_date = ?, paid_amount = ?, payment_status = ? 
           WHERE id = ?`,
            [payment_date, paid_amount, payment_status, id]
        );
    },
    delete: async (id) => {
        await db.query('DELETE FROM RoomPayments WHERE id = ?', [id]);
    },
};
module.exports = RoomPayment;

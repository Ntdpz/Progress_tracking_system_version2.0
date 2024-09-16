const express = require("express");
const router = express.Router();
const connection = require("../db"); // การเชื่อมต่อกับฐานข้อมูล

// POST: ส่งการแจ้งเตือน
router.post("/send", (req, res) => {
    const { message, senderId, recipientId } = req.body;

    // Log ข้อมูลที่ได้รับจาก client
    console.log("message:", message);
    console.log("senderId:", senderId);
    console.log("recipientId:", recipientId);

    if (!message || !senderId || !recipientId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `INSERT INTO notifications (message, sender_id, receiver_id) VALUES (?, ?, ?)`;
    connection.query(sql, [message, senderId, recipientId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to send notification" });
        }
        res.status(200).json({ message: "Notification sent successfully!" });
    });
});

// GET: ดึงการแจ้งเตือนทั้งหมดสำหรับผู้รับ
router.get("/getNotifications/:receiverId", (req, res) => {
    const { receiverId } = req.params;

    const sql = `SELECT * FROM notifications WHERE receiver_id = ? ORDER BY created_at DESC`;
    connection.query(sql, [receiverId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to retrieve notifications" });
        }
        res.status(200).json(results);
    });
});

// PUT: อัปเดตสถานะการแจ้งเตือนว่าอ่านแล้ว
router.put("/markAsRead/:id", (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE notifications SET is_read = TRUE WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to mark notification as read" });
        }
        res.status(200).json({ message: "Notification marked as read" });
    });
});

// DELETE: ลบการแจ้งเตือน
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM notifications WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to delete notification" });
        }
        res.status(200).json({ message: "Notification deleted successfully!" });
    });
});

module.exports = router;

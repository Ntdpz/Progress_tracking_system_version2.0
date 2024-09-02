import CryptoJS from 'crypto-js';

const secretKey = 'progress-tracking'; // คุณสามารถเปลี่ยน secretKey ให้เป็นค่าสำหรับโปรเจกต์ของคุณเอง

// ฟังก์ชันเข้ารหัส
export function encodeId(id) {
    return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
}

// ฟังก์ชันถอดรหัส
export function decodeId(encodedId) {
    const bytes = CryptoJS.AES.decrypt(encodedId, secretKey);
    const originalId = bytes.toString(CryptoJS.enc.Utf8);
    return originalId ? originalId : null;
}

import { useState } from "react";
import axios from "axios";

function TwoFactor() {

    const [qrCode, setQrCode] = useState("");
    const [secret, setSecret] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    const generateQR = async () => {
        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/auth/generate-qr",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQrCode(res.data.qr_code);
            setSecret(res.data.secret);

        } catch (err) {
            alert("Failed to generate QR");
            console.log(err);
        }
    };

    const verifyOTP = async () => {

        try {

            const res = await axios.post(
                `http://127.0.0.1:8000/auth/verify-otp?otp=${otp}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(res.data.message);

        } catch (err) {
            alert("Invalid OTP");
        }

    };

    return (

        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow">

            <h1 className="text-2xl font-bold mb-5">
                Two-Factor Authentication
            </h1>

            <button
                onClick={generateQR}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Generate QR
            </button>

            {qrCode && (

                <div className="mt-6">

                    <img
                        src={`data:image/png;base64,${qrCode}`}
                        alt="QR Code"
                        className="w-60"
                    />

                    <p className="mt-3 text-sm break-all">
                        Secret: {secret}
                    </p>

                </div>

            )}

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                className="border w-full mt-5 p-2 rounded"
            />

            <button
                onClick={verifyOTP}
                className="bg-green-600 text-white px-4 py-2 rounded mt-3"
            >
                Verify OTP
            </button>

            <p className="mt-4 text-green-600 font-semibold">
                {message}
            </p>

        </div>

    );

}

export default TwoFactor;
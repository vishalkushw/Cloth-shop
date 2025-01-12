import Loader from "./Loader";
import { useState } from "react";

const CheckOut = () => {
    const [load, setLoad] = useState(false);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        // setLoad(true);

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            // setLoad(false);
            alert("Razorpay failed to load. Please check your internet connection.");
            return;
        }

        const options = {
            key: "rzp_test_GcZZFDPP0jHtC4", 
            amount: 50000,
            currency: "INR",
            name: "VISHAL KUSHWAH",
            description: "Payment to vishal ",
            image: "https://your-logo-url.com/logo.png", 
            handler: function (response) {
                setLoad(false);
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Vishal kushwah",
                email: "kushwahvishal2391@gmail.com",
                contact: "8435531749",
            },
            
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        // setLoad(false);
    };

    return (
        <>
            {load ? (
                <div style={{ width: "100px", margin: "auto" }}>
                    <Loader />
                </div>
            ) : (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h2>Complete Your Purchase</h2>



                    <button
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={handlePayment}
                    >
                        Pay Now
                    </button>
                </div>
            )}
        </>
    );
};

export default CheckOut;

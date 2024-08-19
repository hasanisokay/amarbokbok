import React from 'react';

const ContactDetails = () => {
    return (
        <>
            <div className="text-lg">
                <p>
                    <strong>ফোনঃ</strong>{" "}
                    <a href="tel:+8801745856249" className="text-blue-600">
                        +8801745856249
                    </a>{" "}
                    (Call Only)
                </p>
                <p>
                    <strong>WhatsApp:</strong>{" "}
                    <a href="https://wa.me/8801745856249" className="text-blue-600">
                        +8801745856249
                    </a>{" "}
                    (Text Only)
                </p>
            </div>
        </>
    );
};

export default ContactDetails;
import React, { useState, useEffect } from "react";

const Sidebar = ({ setActiveSection }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Đặt ngưỡng màn hình
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Gọi hàm ngay khi component mount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={isMobile ? styles.mobileSidebar : styles.sidebar}>
            <button
                style={styles.button}
                onClick={() => setActiveSection("AccountInfo")}
            >
                Thông tin tài khoản
            </button>
            <button
                style={styles.button}
                onClick={() => setActiveSection("OrderManagement")}
            >
                Theo dõi đơn hàng
            </button>
        </div>
    );
};

const styles = {
    sidebar: {
        width: "250px",
        backgroundColor: "#f5f5f5",
        padding: "20px",
    },
    mobileSidebar: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: "10px",
    },
    button: {
        width: "100%",
        padding: "15px",
        margin: "5px 0",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        cursor: "pointer",
        textAlign: "center",
    },
};

export default Sidebar;

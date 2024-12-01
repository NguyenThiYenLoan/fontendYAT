import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "../Profile/ProfilePage";
import OrderManagement from "./OrderManagement";
import { useMediaQuery } from "react-responsive";

const UserPage = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 740px)' });

    const [activeSection, setActiveSection] = useState("AccountInfo");

    const renderContent = () => {
        switch (activeSection) {
            case "AccountInfo":
                return <ProfilePage />;
            case "OrderManagement":
                return <OrderManagement />;
            default:
                return <ProfilePage />;
        }
    };

    return (
        <>
            <div style={styles.divider}></div>
            <div style={{display: isMobile ? "block" : "flex",  // Nếu là mobile thì hiển thị block
                     width: isMobile ? "100%" : "auto",}}>

                <Sidebar setActiveSection={setActiveSection} />
                <div style={styles.content}>{renderContent()}</div>
            </div>
        </>
    );
};

const styles = {
    
    content: {
        flex: 1,
        padding: "20px",
    },
    divider: {
        width: "100%",
        height: "2px",
        backgroundColor: "rgb(245, 245, 245)",
    },
    
};

export default UserPage;

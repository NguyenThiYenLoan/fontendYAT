import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHooks";

const App = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState("Chờ xác nhận");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        mutationMyOrder.mutate({ id: user?.id, type: activeTab });
    }, [user?.id && activeTab]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Đặt ngưỡng màn hình
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Gọi hàm ngay khi component mount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mutationMyOrder = useMutationHooks((data) => {
        const { id, type } = data;
        const res = OrderService.getAllOrderDetailApp(id, type);
        return res;
    });

    const { isPending, data } = mutationMyOrder;
    console.log("datadata", data?.data);  // Log dữ liệu trả về từ API

    const tabs = [
        "Chờ xác nhận",
        "Chờ lấy hàng",
        "Chờ giao hàng",
        "Đã giao hàng",
        "Đã hủy",
        "Trả hàng",
    ];

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
          state: {
            token: user?.token
          }
        })
      }

    return (
        <div style={isMobile ? styles.mobileContainer : styles.container}>
            {/* Thanh chuyển tab */}
            <div style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === tab ? "2px solid red" : "none",
                            color: activeTab === tab ? "red" : "black",
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Danh sách đơn hàng */}
            <div style={styles.orderList}>
                {Array.isArray(data?.data) && data?.data.length > 0 ? (
                    data?.data.map((order, index) => (
                        <div key={index} style={isMobile ? styles.mobileOrderItem : styles.orderItem}>
                            <div style={styles.shopHeader}>
                                <span
                                    style={{
                                        ...styles.shopType,
                                        backgroundColor: "#ffe4c4",
                                        color: "red",
                                    }}
                                >
                                    Đơn hàng
                                </span>
                                <button
                                    style={styles.viewShopButton}
                                    onClick={() => handleDetailsOrder(order?._id)}
                                >
                                    Xem Đơn
                                </button>
                            </div>
                            {order?.orderItems.map((product, productIndex) => (
                                <div key={productIndex} style={styles.productInfo}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={styles.productImage}
                                    />
                                    <div style={styles.productDetails}>
                                        <p style={styles.productName}>
                                            {product.name}
                                        </p>
                                        <p style={styles.price}>
                                            <span style={styles.originalPrice}>
                                                {product.price}
                                            </span>
                                            <span>{product.price}</span>
                                        </p>
                                        <p style={styles.quantity}>
                                            x {product.amount}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div style={styles.orderFooter}>
                               
                                <div style={styles.actionButtons}>
                                    <button
                                        style={styles.reviewButton}
                                    >
                                        Đánh Giá
                                    </button>
                                    <button
                                        style={styles.reorderButton}
                                    >
                                        Mua Lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có đơn hàng nào trong mục này.</p>
                )}
            </div>

        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        margin: "20px",
    },
    mobileContainer: {
        width: "100%",
        overflow: "auto",
    },
    tabContainer: {
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
    },
    tab: {
        padding: "10px 15px",
        fontSize: "16px",
        background: "none",
        border: "none",
        cursor: "pointer",
        outline: "none",
    },
    orderList: {
        marginTop: "20px",
    },
    orderItem: {
        border: "1px solid #ddd",
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "8px",
    },
    mobileOrderItem: {
        width: "100%",

    },
    shopHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    shopType: {
        fontWeight: "bold",
        padding: "5px 8px",
        borderRadius: "4px",
    },
    shopName: {
        fontSize: "16px",
        marginLeft: "10px",
    },
    chatButton: {
        border: "none",
        backgroundColor: "#f5f5f5",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "10px",
    },
    viewShopButton: {
        border: "none",
        backgroundColor: "#f5f5f5",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "10px",
    },
    productInfo: {
        display: "flex",
        marginTop: "10px",
    },
    productImage: {
        width: "100px",
        height: "100px",
        objectFit: "contain",
        border: "1px solid #ddd",
        borderRadius: "8px",
    },
    productDetails: {
        marginLeft: "15px",
    },
    productName: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    price: {
        color: "red",
    },
    originalPrice: {
        textDecoration: "line-through",
        color: "gray",
        marginRight: "10px",
    },
    deliveryStatus: {
        margin: "10px 0",
        fontSize: "14px",
    },
    reviewDeadline: {
        fontSize: "14px",
        color: "gray",
    },
    reward: {
        fontSize: "14px",
        color: "gray",
    },
    actionButtons: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    reviewButton: {
        border: "none",
        padding: "8px 15px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        backgroundColor: "#ff5722",
        color: "#fff",
    },
    contactButton: {
        border: "none",
        padding: "8px 15px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        backgroundColor: "#ffcc00",
        color: "#fff",
    },
    reorderButton: {
        border: "none",
        padding: "8px 15px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        backgroundColor: "#009688",
        color: "#fff",
    },
};

export default App;

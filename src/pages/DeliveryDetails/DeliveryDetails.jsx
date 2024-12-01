import React from 'react';

const orderData = {
    orderId: "241003J1TC6QE6",
    status: "Đơn hàng đã hoàn thành",
    trackingInfo: [
        { time: "09:36 04-10-2024", status: "Đã giao", detail: "Giao hàng thành công", receiver: "Nguyễn Thị Yến Loan" },
        { time: "07:36 04-10-2024", status: "Đang vận chuyển", detail: "Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại" },
        { time: "06:10 04-10-2024", status: "Đến trạm giao hàng", detail: "Tại Phường Thạnh Xuân, Quận 12, TP. Hồ Chí Minh" },
        { time: "04:13 04-10-2024", status: "Rời kho phân loại" },
        { time: "21:24 03-10-2024", status: "Đến kho phân loại", detail: "Tại Xã Tân Phú Trung, Huyện Củ Chi, TP. Hồ Chí Minh" },
        { time: "20:52 03-10-2024", status: "Đến bưu cục" },
        { time: "18:38 03-10-2024", status: "Rời bưu cục" },
        { time: "15:23 03-10-2024", status: "Đến bưu cục", detail: "Tại Phường Bình Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh" },
        { time: "14:46 03-10-2024", status: "Lấy hàng thành công" },
        { time: "09:15 03-10-2024", status: "Đang được chuẩn bị", detail: "Người gửi đang chuẩn bị hàng" },
        { time: "09:07 03-10-2024", status: "Đặt hàng thành công", detail: "Đơn hàng đã được đặt" },
    ],
};

const DeliveryDetails = () => {
    return (
        <div style={styles.container}>
            <h2>MÃ ĐƠN HÀNG: {orderData.orderId}</h2>
            <h3 style={styles.status}>{orderData.status}</h3>
            <div style={styles.timeline}>
                {orderData.trackingInfo.map((item, index) => (
                    <div key={index} style={styles.timelineItem}>
                        <div style={styles.time}>{item.time}</div>
                        <div style={styles.detail}>
                            <strong>{item.status}</strong>
                            {item.detail && <p>{item.detail}</p>}
                            {item.receiver && <p>Người nhận hàng: {item.receiver}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginTop:'20px',
        marginBottom:'20px',
    },
    status: {
        color: 'red',
        marginBottom: '20px',
    },
    timeline: {
        borderLeft: '4px solid #007bff',
        paddingLeft: '10px',
    },
    timelineItem: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
    },
    time: {
        fontSize: '14px',
        color: '#555',
    },
    detail: {
        marginLeft: '10px',
        paddingLeft: '15px',
        borderLeft: '2px solid #ddd',
        fontSize: '16px',
    },
};

export default DeliveryDetails;

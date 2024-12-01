import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getNumberOfVisits } from "../../services/VisitService";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AccessStatisticsPage = () => {
  const [stats, setStats] = useState({
    users: 0,
    pageviews: 0,
    events: 0,
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const GetAllVisit = async () => {
    const res = await getNumberOfVisits();
    return res.data;
  };

  const typeVisit = useQuery({ queryKey: ['type-visit'], queryFn: GetAllVisit });

  // Hàm chuyển đổi từ ngày thành thứ trong tuần
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
    return daysOfWeek[date.getDay() - 1]; // getDay() trả về số từ 0 (Chủ nhật) đến 6 (Thứ 7)
  };

  useEffect(() => {
    const fetchData = async () => {
      const visits = typeVisit.data || [];
      
      // Mảng chứa số lượt truy cập mỗi ngày trong tuần
      const dailyVisits = {
        "Thứ 2": 0,
        "Thứ 3": 0,
        "Thứ 4": 0,
        "Thứ 5": 0,
        "Thứ 6": 0,
        "Thứ 7": 0,
        "CN": 0
      };

      // Lặp qua các lượt truy cập và cộng số lượt vào ngày tương ứng
      visits.forEach((visit) => {
        const dayOfWeek = getDayOfWeek(visit.startTime);
        dailyVisits[dayOfWeek] += visit.visits;
      });

      // Cập nhật dữ liệu cho biểu đồ
      setChartData({
        labels: Object.keys(dailyVisits),
        datasets: [
          {
            label: "Lượt truy cập",
            data: Object.values(dailyVisits),
            borderColor: "#42a5f5",
            backgroundColor: "rgba(66, 165, 245, 0.2)",
            tension: 0.4, // Làm mềm đường biểu đồ
          },
        ],
      });

      // Cập nhật các thống kê tổng
      const totalVisits = visits.reduce((sum, item) => sum + item.visits, 0);
      const totalDuration = visits.reduce((sum, item) => sum + item.totalDuration, 0);
      const avgDuration = totalDuration / totalVisits / 60; // Đổi từ giây sang phút

      setStats({
        users: visits.length,
        pageviews: totalVisits,
        events: Math.round(avgDuration * 100) / 100,
      });
    };

    fetchData();
  }, [typeVisit.data]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thống Kê Lượt Truy Cập</h1>

      {/* Thẻ thống kê */}
      <div style={styles.stats}>
        <StatCard title="Người Dùng" value={stats.users} icon="👥" />
        <StatCard title="Lượt Xem Trang" value={stats.pageviews} icon="📄" />
        <StatCard title="Thời Gian Truy Cập Trung Bình" value={stats.events} icon="⚡" />
      </div>

      {/* Biểu đồ */}
      <div style={styles.chart}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// Component hiển thị thẻ thống kê
const StatCard = ({ title, value, icon }) => (
  <div style={styles.card}>
    <div style={styles.icon}>{icon}</div>
    <div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardValue}>{value}</p>
    </div>
  </div>
);

// Cấu hình cho biểu đồ
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Thống kê lượt truy cập theo tuần",
    },
  },
  scales: {
    x: {
      type: "category",
    },
    y: {
      beginAtZero: true,
    },
  },
};

// CSS-in-JS cho các thành phần
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "30%",
    minWidth: "200px",
  },
  icon: {
    fontSize: "32px",
    marginRight: "10px",
    color: "#42a5f5",
  },
  cardTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#555",
  },
  cardValue: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  chart: {
    marginTop: "30px",
  },
};

export default AccessStatisticsPage;

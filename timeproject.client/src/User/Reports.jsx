import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, 
    faChartBar, 
    faChartPie, 
    faCalendarAlt,
    faClock,
    faTasks,
    faDownload,
    faFilter,
    faCalendarDay,
    faCalendarWeek,
    faArrowUp,
    faArrowDown,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import './Reports.css';

const Reports = () => {
    const [timeRange, setTimeRange] = useState('week');
    const [selectedMetric, setSelectedMetric] = useState('productivity');
    const [stats, setStats] = useState({
        productivity: 85,
        tasksCompleted: 24,
        timeSpent: 42,
        efficiency: 78
    });

    // Örnek veri
    const [reportData, setReportData] = useState({
        productivity: {
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            data: [75, 82, 88, 85, 90, 65, 70]
        },
        tasks: {
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            data: [5, 7, 4, 6, 8, 3, 2]
        },
        timeSpent: {
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            data: [6, 7, 5, 8, 6, 4, 3]
        }
    });

    // Örnek trend verileri
    const [trends, setTrends] = useState([
        {
            id: 1,
            title: 'Verimlilik Artışı',
            value: '+12%',
            change: 'positive',
            period: 'Bu Hafta',
            icon: faArrowUp
        },
        {
            id: 2,
            title: 'Görev Tamamlama',
            value: '24',
            change: 'neutral',
            period: 'Bu Ay',
            icon: faTasks
        },
        {
            id: 3,
            title: 'Ortalama Çalışma Süresi',
            value: '6.2s',
            change: 'negative',
            period: 'Bu Hafta',
            icon: faClock
        }
    ]);

    // Örnek aktivite verileri
    const [activities, setActivities] = useState([
        {
            id: 1,
            title: 'Proje Planlaması',
            duration: '2.5 saat',
            efficiency: 92,
            date: '2024-03-15'
        },
        {
            id: 2,
            title: 'Toplantı',
            duration: '1 saat',
            efficiency: 85,
            date: '2024-03-14'
        },
        {
            id: 3,
            title: 'Rapor Hazırlama',
            duration: '3 saat',
            efficiency: 88,
            date: '2024-03-13'
        }
    ]);

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        // Burada API'den yeni veri çekilebilir
    };

    const handleMetricChange = (metric) => {
        setSelectedMetric(metric);
        // Burada seçilen metriğe göre grafik güncellenebilir
    };

    const handleDownloadReport = () => {
        // Rapor indirme işlemi simülasyonu
        console.log('Rapor indiriliyor...');
    };

    const getEfficiencyColor = (efficiency) => {
        if (efficiency >= 90) return '#10B981';
        if (efficiency >= 75) return '#6366F1';
        if (efficiency >= 60) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <div className="reports-container">
            <div className="reports-header">
                <div className="header-content">
                    <h1>Raporlar ve Analizler</h1>
                    <p>Performans metriklerinizi ve aktivite analizlerinizi görüntüleyin</p>
                </div>
                <div className="header-actions">
                    <div className="time-range-selector">
                        <button 
                            className={timeRange === 'day' ? 'active' : ''}
                            onClick={() => handleTimeRangeChange('day')}
                        >
                            <FontAwesomeIcon icon={faCalendarDay} />
                            <span>Gün</span>
                        </button>
                        <button 
                            className={timeRange === 'week' ? 'active' : ''}
                            onClick={() => handleTimeRangeChange('week')}
                        >
                            <FontAwesomeIcon icon={faCalendarWeek} />
                            <span>Hafta</span>
                        </button>
                        <button 
                            className={timeRange === 'month' ? 'active' : ''}
                            onClick={() => handleTimeRangeChange('month')}
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Ay</span>
                        </button>
                    </div>
                    <button className="download-button" onClick={handleDownloadReport}>
                        <FontAwesomeIcon icon={faDownload} />
                        <span>Raporu İndir</span>
                    </button>
                </div>
            </div>

            <div className="trends-grid">
                {trends.map(trend => (
                    <div key={trend.id} className="trend-card">
                        <div className="trend-icon">
                            <FontAwesomeIcon icon={trend.icon} />
                        </div>
                        <div className="trend-info">
                            <h3>{trend.title}</h3>
                            <div className="trend-value">
                                <span className={trend.change}>{trend.value}</span>
                                <span className="trend-period">{trend.period}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-header">
                        <h3>Verimlilik Analizi</h3>
                        <div className="metric-actions">
                            <button 
                                className={selectedMetric === 'productivity' ? 'active' : ''}
                                onClick={() => handleMetricChange('productivity')}
                            >
                                <FontAwesomeIcon icon={faChartLine} />
                            </button>
                            <button 
                                className={selectedMetric === 'tasks' ? 'active' : ''}
                                onClick={() => handleMetricChange('tasks')}
                            >
                                <FontAwesomeIcon icon={faChartBar} />
                            </button>
                            <button 
                                className={selectedMetric === 'timeSpent' ? 'active' : ''}
                                onClick={() => handleMetricChange('timeSpent')}
                            >
                                <FontAwesomeIcon icon={faChartPie} />
                            </button>
                        </div>
                    </div>
                    <div className="metric-chart">
                        {/* Burada gerçek bir grafik kütüphanesi kullanılabilir (Chart.js, Recharts vb.) */}
                        <div className="chart-placeholder">
                            <FontAwesomeIcon icon={faChartLine} size="3x" />
                            <p>Grafik görünümü</p>
                        </div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-header">
                        <h3>Performans Özeti</h3>
                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                    </div>
                    <div className="performance-stats">
                        <div className="stat-item">
                            <span className="stat-label">Verimlilik</span>
                            <div className="stat-value">
                                <span>{stats.productivity}%</span>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${stats.productivity}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Tamamlanan Görevler</span>
                            <div className="stat-value">
                                <span>{stats.tasksCompleted}</span>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${(stats.tasksCompleted / 30) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Çalışma Süresi</span>
                            <div className="stat-value">
                                <span>{stats.timeSpent} saat</span>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${(stats.timeSpent / 50) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="activities-section">
                <h2>Son Aktiviteler</h2>
                <div className="activities-list">
                    {activities.map(activity => (
                        <div key={activity.id} className="activity-card">
                            <div className="activity-info">
                                <h3>{activity.title}</h3>
                                <div className="activity-meta">
                                    <span>
                                        <FontAwesomeIcon icon={faClock} />
                                        {activity.duration}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        {activity.date}
                                    </span>
                                </div>
                            </div>
                            <div className="activity-efficiency">
                                <div 
                                    className="efficiency-circle"
                                    style={{ 
                                        background: `conic-gradient(${getEfficiencyColor(activity.efficiency)} ${activity.efficiency * 3.6}deg, transparent 0deg)`
                                    }}
                                >
                                    <span>{activity.efficiency}%</span>
                                </div>
                                <span className="efficiency-label">Verimlilik</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports; 
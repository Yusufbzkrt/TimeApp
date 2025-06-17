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
        productivity: 0,
        tasksCompleted: 0,
        timeSpent: 0,
        efficiency: 0
    });

    const [reportData, setReportData] = useState({
        productivity: {
            labels: [],
            data: []
        },
        tasks: {
            labels: [],
            data: []
        },
        timeSpent: {
            labels: [],
            data: []
        }
    });

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

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verileri API'den çek
    const fetchReportData = async () => {
        try {
            setLoading(true);
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                throw new Error('Oturum süresi dolmuş');
            }

            // İstatistikleri çek
            const statsResponse = await fetch(`https://localhost:7120/api/Reports/stats?timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!statsResponse.ok) {
                throw new Error('İstatistikler alınamadı');
            }

            const statsData = await statsResponse.json();
            setStats(statsData);

            // Trend verilerini çek
            const trendsResponse = await fetch(`https://localhost:7120/api/Reports/trends?timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!trendsResponse.ok) {
                throw new Error('Trend verileri alınamadı');
            }

            const trendsData = await trendsResponse.json();
            // Backend'den gelen verileri ikonlarla eşleştir
            const processedTrends = trendsData.map(trend => ({
                ...trend,
                icon: trend.icon === 'faArrowUp' ? faArrowUp :
                      trend.icon === 'faTasks' ? faTasks :
                      trend.icon === 'faClock' ? faClock :
                      trend.icon === 'faArrowDown' ? faArrowDown :
                      faInfoCircle // varsayılan ikon
            }));
            setTrends(processedTrends);

            // Aktivite verilerini çek
            const activitiesResponse = await fetch(`https://localhost:7120/api/Reports/activities?timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!activitiesResponse.ok) {
                throw new Error('Aktivite verileri alınamadı');
            }

            const activitiesData = await activitiesResponse.json();
            setActivities(activitiesData);

            // Grafik verilerini çek
            const chartResponse = await fetch(`https://localhost:7120/api/Reports/chart?metric=${selectedMetric}&timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!chartResponse.ok) {
                throw new Error('Grafik verileri alınamadı');
            }

            const chartData = await chartResponse.json();
            setReportData(prevData => ({
                ...prevData,
                [selectedMetric]: chartData
            }));

            setError(null);
        } catch (err) {
            console.error('Veri çekme hatası:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, [timeRange, selectedMetric]);

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    };

    const handleMetricChange = (metric) => {
        setSelectedMetric(metric);
    };

    const handleDownloadReport = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                throw new Error('Oturum süresi dolmuş');
            }

            const response = await fetch(`https://localhost:7120/api/Reports/download?timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Rapor indirilemedi');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rapor-${timeRange}-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Rapor indirme hatası:', err);
            alert('Rapor indirilirken bir hata oluştu');
        }
    };

    const getEfficiencyColor = (efficiency) => {
        if (efficiency >= 90) return '#10B981';
        if (efficiency >= 75) return '#6366F1';
        if (efficiency >= 60) return '#F59E0B';
        return '#EF4444';
    };

    if (loading) {
        return (
            <div className="reports-container">
                <div className="loading-message">
                    <FontAwesomeIcon icon={faChartLine} spin size="2x" />
                    <p>Raporlar yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reports-container">
                <div className="error-message">
                    <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                    <p>{error}</p>
                    <button onClick={fetchReportData}>Tekrar Dene</button>
                </div>
            </div>
        );
    }

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
                        <div className="chart-placeholder">
                            <FontAwesomeIcon icon={faChartLine} size="3x" />
                            <p>Grafik görünümü</p>
                            <div className="chart-data">
                                {reportData[selectedMetric].labels.map((label, index) => (
                                    <div key={label} className="chart-bar">
                                        <div 
                                            className="bar-fill"
                                            style={{ 
                                                height: `${(reportData[selectedMetric].data[index] / Math.max(...reportData[selectedMetric].data)) * 100}%` 
                                            }}
                                        />
                                        <span className="bar-label">{label}</span>
                                    </div>
                                ))}
                            </div>
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
                            <div className="activity-header">
                                <h3>{activity.title}</h3>
                                <span className="activity-date">{new Date(activity.date).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="activity-details">
                                <div className="activity-duration">
                                    <FontAwesomeIcon icon={faClock} />
                                    <span>{activity.duration}</span>
                                </div>
                                <div className="activity-efficiency">
                                    <FontAwesomeIcon icon={faChartLine} />
                                    <span style={{ color: getEfficiencyColor(activity.efficiency) }}>
                                        {activity.efficiency}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports; 
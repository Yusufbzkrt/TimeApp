import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFile, 
    faFilePdf, 
    faFileWord, 
    faFileExcel, 
    faFileImage, 
    faTrash, 
    faDownload, 
    faShare, 
    faSearch,
    faFolder,
    faPlus,
    faSort,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import './Document.css';

const Document = () => {
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [filterType, setFilterType] = useState('all');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Örnek doküman verileri
    useEffect(() => {
        const mockDocuments = [
            { id: 1, name: 'Proje Raporu.pdf', type: 'pdf', size: '2.5MB', date: '2024-03-15', category: 'Raporlar' },
            { id: 2, name: 'Toplantı Notları.docx', type: 'docx', size: '1.2MB', date: '2024-03-14', category: 'Notlar' },
            { id: 3, name: 'Bütçe Tablosu.xlsx', type: 'xlsx', size: '3.8MB', date: '2024-03-13', category: 'Finans' },
            { id: 4, name: 'Logo.png', type: 'png', size: '500KB', date: '2024-03-12', category: 'Görseller' },
        ];
        setDocuments(mockDocuments);
    }, []);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simüle edilmiş yükleme işlemi
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setUploadProgress(i);
        }

        // Yeni dosyaları listeye ekle
        const newDocuments = selectedFiles.map((file, index) => ({
            id: documents.length + index + 1,
            name: file.name,
            type: file.name.split('.').pop(),
            size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
            date: new Date().toISOString().split('T')[0],
            category: 'Yeni Yüklenenler'
        }));

        setDocuments([...documents, ...newDocuments]);
        setSelectedFiles([]);
        setIsUploading(false);
        setUploadProgress(0);
    };

    const handleDelete = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const handleDownload = (document) => {
        // Simüle edilmiş indirme işlemi
        console.log(`İndiriliyor: ${document.name}`);
    };

    const handleShare = (document) => {
        // Simüle edilmiş paylaşım işlemi
        console.log(`Paylaşılıyor: ${document.name}`);
    };

    const getFileIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'pdf': return faFilePdf;
            case 'docx':
            case 'doc': return faFileWord;
            case 'xlsx':
            case 'xls': return faFileExcel;
            case 'png':
            case 'jpg':
            case 'jpeg': return faFileImage;
            default: return faFile;
        }
    };

    const filteredDocuments = documents
        .filter(doc => 
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType === 'all' || doc.type.toLowerCase() === filterType.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            }
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === 'size') {
                return parseFloat(b.size) - parseFloat(a.size);
            }
            return 0;
        });

    return (
        <div className="document-container">
            <div className="document-header">
                <h1>Dokümanlarım</h1>
                <div className="document-actions">
                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Doküman ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-sort">
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="all">Tüm Dosyalar</option>
                            <option value="pdf">PDF</option>
                            <option value="docx">Word</option>
                            <option value="xlsx">Excel</option>
                            <option value="png">Görsel</option>
                        </select>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">Tarihe Göre</option>
                            <option value="name">İsme Göre</option>
                            <option value="size">Boyuta Göre</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="upload-section">
                <div className="upload-area">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        id="file-upload"
                        className="file-input"
                    />
                    <label htmlFor="file-upload" className="upload-button">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dosya Seç</span>
                    </label>
                    {selectedFiles.length > 0 && (
                        <button 
                            className="upload-submit"
                            onClick={handleUpload}
                            disabled={isUploading}
                        >
                            {isUploading ? 'Yükleniyor...' : 'Yükle'}
                        </button>
                    )}
                </div>
                {isUploading && (
                    <div className="upload-progress">
                        <div 
                            className="progress-bar"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </div>

            <div className="documents-grid">
                {filteredDocuments.map(doc => (
                    <div key={doc.id} className="document-card">
                        <div className="document-icon">
                            <FontAwesomeIcon icon={getFileIcon(doc.type)} />
                        </div>
                        <div className="document-info">
                            <h3>{doc.name}</h3>
                            <p className="document-meta">
                                <span>{doc.size}</span>
                                <span>{doc.date}</span>
                                <span>{doc.category}</span>
                            </p>
                        </div>
                        <div className="document-actions">
                            <button onClick={() => handleDownload(doc)} title="İndir">
                                <FontAwesomeIcon icon={faDownload} />
                            </button>
                            <button onClick={() => handleShare(doc)} title="Paylaş">
                                <FontAwesomeIcon icon={faShare} />
                            </button>
                            <button onClick={() => handleDelete(doc.id)} title="Sil">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDocuments.length === 0 && (
                <div className="no-documents">
                    <FontAwesomeIcon icon={faFolder} size="3x" />
                    <p>Henüz doküman bulunmuyor</p>
                </div>
            )}
        </div>
    );
};

export default Document; 
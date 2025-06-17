import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileAlt,
    faDownload,
    faTrash,
    faPlus,
    faSpinner,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import "./Document.css";

const Document = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://localhost:7120/api/Document/GetDocuments', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (!response.ok) {
                throw new Error('Dökümanlar yüklenirken bir hata oluştu');
            }

            const data = await response.json();
            setDocuments(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Lütfen bir dosya seçin');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('https://localhost:7120/api/Document/UploadDocument', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Dosya yüklenirken bir hata oluştu');
            }

            await fetchDocuments();
            setSelectedFile(null);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async (documentId, fileName) => {
        try {
            const response = await fetch(`https://localhost:7120/api/Document/DownloadDocument/${documentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (!response.ok) {
                throw new Error('Dosya indirilirken bir hata oluştu');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (documentId) => {
        if (!window.confirm('Bu dökümanı silmek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7120/api/Document/DeleteDocument/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (!response.ok) {
                throw new Error('Döküman silinirken bir hata oluştu');
            }

            await fetchDocuments();
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="document-container">
            <div className="document-header">
                <h1>
                    <FontAwesomeIcon icon={faFileAlt} />
                    Dökümanlarım
                </h1>
                <div className="upload-section">
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        className="file-input"
                        accept=".pdf,.doc,.docx,.txt"
                    />
                    <label htmlFor="file-upload" className="upload-button">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dosya Seç</span>
                    </label>
                    {selectedFile && (
                        <button
                            className="upload-submit-button"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    <span>Yükleniyor...</span>
                                </>
                            ) : (
                                <span>Yükle</span>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <p>Dökümanlar yükleniyor...</p>
                </div>
            ) : documents.length === 0 ? (
                <div className="no-documents">
                    <p>Henüz döküman bulunmuyor.</p>
                </div>
            ) : (
                <div className="document-list">
                    {documents.map((doc) => (
                        <div key={doc.id} className="document-item">
                            <div className="document-info">
                                <FontAwesomeIcon icon={faFileAlt} className="document-icon" />
                                <div className="document-details">
                                    <h3>{doc.fileName}</h3>
                                    <p>Yüklenme Tarihi: {new Date(doc.uploadDate).toLocaleDateString('tr-TR')}</p>
                                </div>
                            </div>
                            <div className="document-actions">
                                <button
                                    className="download-button"
                                    onClick={() => handleDownload(doc.id, doc.fileName)}
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                    <span>İndir</span>
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(doc.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>Sil</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Document; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBlog,
    faEdit,
    faSpinner,
    faExclamationCircle,
    faArrowLeft,
    faSave,
    faTimes,
    faImage,
    faUpload
} from '@fortawesome/free-solid-svg-icons';
import "./MyBlogEdit.css";

const MyBlogEdit = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [form, setForm] = useState({ 
        title: '', 
        content: '', 
        blogId: '',
        imageUrl: '',
        imageFile: null 
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://localhost:7120/api/User/GetBlog/${blogId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    }
                });
                if (!res.ok) {
                    throw new Error('Blog yüklenirken bir hata oluştu.');
                }
                const data = await res.json();
                setBlog(data);
                setForm({
                    title: data.title,
                    content: data.content,
                    blogId: data.blogId,
                    imageUrl: data.imageUrl || '',
                    imageFile: null
                });
                setError(null);
            } catch (err) {
                console.error('Blog yükleme hatası:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchBlog();
        }
    }, [blogId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({ ...prev, imageFile: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Title', form.title);
            formData.append('Content', form.content);
            formData.append('BlogId', form.blogId);
            if (form.imageFile) {
                formData.append('ImageUrl', form.imageFile);
            }

            console.log('Gönderilen veriler:', {
                title: form.title,
                content: form.content,
                blogId: form.blogId,
                imageUrl: form.imageUrl,
                hasImage: !!form.imageFile
            });

            const res = await fetch(`https://localhost:7120/api/User/MyBlogEdit/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Sunucu yanıtı:', errorText);
                throw new Error(`Sunucu hatası: ${res.status} - ${errorText}`);
            }

            alert('Blog başarıyla güncellendi!');
            navigate('/user/blog');
        } catch (err) {
            console.error('Güncelleme hatası:', err);
            setError(err.message);
            alert(`Güncelleme hatası: ${err.message}`);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Değişiklikleriniz kaydedilmedi. Çıkmak istediğinizden emin misiniz?')) {
            navigate('/user/blog');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Blog yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
                <p>{error}</p>
                <button className="back-button" onClick={() => navigate('/user/blog')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Bloglara Dön</span>
                </button>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="error-container">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
                <p>Blog bulunamadı.</p>
                <button className="back-button" onClick={() => navigate('/user/blog')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Bloglara Dön</span>
                </button>
            </div>
        );
    }

    return (
        <div className="blog-edit-container">
            <div className="blog-edit-header">
                <button className="back-button" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Bloglara Dön</span>
                </button>
                <div className="header-content">
                    <FontAwesomeIcon icon={faEdit} className="header-icon" />
                    <h1>Blog Düzenle</h1>
                    <p className="welcome-text">
                        Blog yazınızı düzenleyin ve değişikliklerinizi kaydedin.
                    </p>
                </div>
            </div>

            <form className="blog-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Blog Başlığı</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Blog başlığı"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Blog İçeriği</label>
                    <textarea
                        id="content"
                        placeholder="Blog içeriği"
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>
                        <FontAwesomeIcon icon={faImage} /> Blog Görseli
                    </label>
                    <div className="image-upload">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="blog-image"
                            className="file-input"
                        />
                        <label htmlFor="blog-image" className="file-input-label">
                            <FontAwesomeIcon icon={faUpload} />
                            <span>Görsel Seç</span>
                        </label>
                    </div>

                    {form.imageUrl && !form.imageFile && (
                        <div className="current-image-preview">
                            <h3>Mevcut Görsel</h3>
                            <div className="image-container">
                                <img
                                    src={`https://localhost:7120${form.imageUrl}`}
                                    alt="Mevcut Blog Görseli"
                                />
                            </div>
                        </div>
                    )}

                    {imagePreview && (
                        <div className="new-image-preview">
                            <h3>Yeni Görsel Önizleme</h3>
                            <div className="image-container">
                                <img
                                    src={imagePreview}
                                    alt="Yeni Blog Görseli"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleCancel}
                        disabled={saving}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                        <span>İptal</span>
                    </button>
                    <button
                        type="submit"
                        className="save-button"
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <span>Kaydediliyor...</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSave} />
                                <span>Kaydet</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyBlogEdit; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBlog, 
    faPlus, 
    faEdit, 
    faTrash, 
    faSpinner,
    faExclamationCircle,
    faCalendarAlt,
    faPaperPlane,
    faImage,
    faUpload,
    faEye,
    faTimes,
    faSearch,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./MyBlog.css";

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ 
        title: '', 
        content: '', 
        image: null 
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Quill editör modülleri ve formatları
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'color', 'background',
        'link', 'image'
    ];

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://localhost:7120/api/User/GetBlog`);
            const data = await res.json();
            setBlogs(data);
            setError(null);
        } catch (err) {
            console.error('Bloglar çekerken hata:', err);
            setError('Bloglar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        if (!blogId) {
            alert('Geçersiz blog ID');
            return;
        }

        if (!window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const res = await fetch(`https://localhost:7120/api/User/BlogDelete/${blogId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                fetchBlogs();
                alert(data.message);
            } else {
                alert(data.message || 'Blog silinirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Silme hatası:', err);
            alert('Bir hata oluştu.');
        }
    };

    const handleEdit = (blog) => {
        navigate(`/user/blog/edit/${blog.blogId}`);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({ ...prev, image: file }));
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
            formData.append("Title", form.title);
            formData.append("Content", form.content);
            if (form.image) {
                formData.append("Image", form.image);
            }

            const res = await fetch('https://localhost:7120/api/Blog/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formData,
            });

            if (res.ok) {
                setForm({ title: '', content: '', image: null });
                setImagePreview(null);
                setShowForm(false);
                fetchBlogs();
            } else {
                console.error('Blog eklenemedi');
            }
        } catch (err) {
            console.error('Blog ekleme hatası:', err);
        }
    };

    const handlePreview = (blog) => {
        setSelectedBlog(blog);
    };

    const closePreview = () => {
        setSelectedBlog(null);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Bloglar yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="my-blog-container">
            <div className="my-blog-header">
                <FontAwesomeIcon icon={faBlog} className="header-icon" />
                <h1>Blog Yazılarım</h1>
                <p className="welcome-text">
                    Düşüncelerinizi ve deneyimlerinizi paylaşın. Yeni bir blog yazısı ekleyerek başlayın!
                </p>
            </div>

            <div className="blog-controls">
                <div className="search-filter">
                    <div className="search-box">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Blog ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <br></br>
                <button 
                    className="add-blog-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Yeni Blog</span>
                </button>
            </div>
            <br></br>
            {showForm && (
                <div className="blog-form">
                    <div className="form-header">
                        <h2>Yeni Blog Yazısı</h2>
                        <button type="button" className="close-button" onClick={() => setShowForm(false)}>×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Blog Başlığı</label>
                            <input
                                type="text"
                                placeholder="Blog başlığını girin"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Blog İçeriği</label>
                            <div className="quill-editor">
                                <ReactQuill
                                    theme="snow"
                                    value={form.content}
                                    onChange={(content) => setForm({ ...form, content })}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Blog içeriğini girin..."
                                />
                            </div>
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
                                    className="image-input"
                                />
                                <label htmlFor="blog-image" className="image-upload-label">
                                    <FontAwesomeIcon icon={faImage} />
                                    <span>Görsel Seç</span>
                                </label>
                            </div>
                            {imagePreview && (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Blog görseli" />
                                    <button 
                                        type="button" 
                                        className="remove-image"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setForm({ ...form, image: null });
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="submit-button">
                                <FontAwesomeIcon icon={faPlus} /> Blog Yayınla
                            </button>
                            <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                                İptal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="blog-list">
                <div className="section-header">
                    <FontAwesomeIcon icon={faBlog} className="section-icon" />
                    <h2>Blog Yazılarım</h2>
                </div>
                
                {blogs.length === 0 ? (
                    <div className="no-blogs">
                        <p>Henüz blog yazınız bulunmuyor.</p>
                    </div>
                ) : (
                    <div className="blog-grid">
                        {blogs.map((blog, index) => (
                            <div key={index} className="blog-card">
                                {blog.imageUrl && (
                                    <div className="blog-image">
                                        <img src={`https://localhost:7120${blog.imageUrl}`} alt={blog.title} />
                                    </div>
                                )}
                                <div className="blog-card-header">
                                    <h3>{blog.title}</h3>
                                    <div className="blog-date">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <span>{new Date(blog.date).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <p>{blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}</p>
                                </div>
                                <div className="blog-actions">
                                    <button 
                                        className="preview-button" 
                                        onClick={() => handlePreview(blog)}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                        <span>Önizle</span>
                                    </button>
                                    <button 
                                        className="edit-button" 
                                        onClick={() => handleEdit(blog)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                        <span>Düzenle</span>
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(blog.blogId)}
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

            {selectedBlog && (
                <div className="preview-modal">
                    <div className="preview-modal-content">
                        <button className="close-modal" onClick={closePreview}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {selectedBlog.imageUrl && (
                            <div className="preview-image">
                                <img src={`https://localhost:7120${selectedBlog.imageUrl}`} alt={selectedBlog.title} />
                            </div>
                        )}
                        <div className="preview-header">
                            <h2>{selectedBlog.title}</h2>
                            <div className="preview-date">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span>{new Date(selectedBlog.date).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="preview-body">
                            <p>{selectedBlog.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBlog;

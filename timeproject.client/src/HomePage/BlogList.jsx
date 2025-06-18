import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faSearch,
    faSpinner,
    faExclamationCircle,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import './BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://localhost:7120/api/blog/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBlogs(data);
                setError(null);
            } catch (error) {
                console.error('Bloglar yüklenirken hata:', error);
                setError('Bloglar yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="blog-list-container">
            <div className="blog-filters">
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

            <div className="blog-grid">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div key={blog.blogId} className="blog-card">
                            {blog.imageUrl && (
                                <div className="blog-image">
                                    <img
                                        src={`https://localhost:7120${blog.imageUrl}`}
                                        alt={blog.title}
                                    />
                                </div>
                            )}
                            <div className="blog-content">
                                <h2>{blog.title}</h2>
                                <p className="blog-excerpt">
                                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                </p>
                                <div className="blog-meta">
                                    <span>
                                        <FontAwesomeIcon icon={faUser} />
                                        {blog.authorName || 'Anonim'}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        {new Date(blog.createdDate).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                                <button className="read-more">Devamını Oku</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-blogs">
                        <p>Henüz blog yazısı bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList; 
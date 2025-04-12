import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MyBlog.css";

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const navigate = useNavigate();
    // Bloglar� �ek
    const fetchBlogs = async () => {
        try {
            const res = await fetch(`https://localhost:7120/api/User/GetBlog`);
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error('Bloglar� �ekerken hata:', err);
        }
    };

    // Sayfa y�klendi�inde bloglar� getir
    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        if (!blogId) {
            alert('Ge�ersiz blog ID');
            return;
        }

        try {
            const res = await fetch(`https://localhost:7120/api/User/BlogDelete/${blogId}`, {
                method: 'DELETE',
            });

            const data = await res.json(); // Hata mesaj�n� almak i�in JSON olarak parse et

            if (res.ok) {
                fetchBlogs(); // Silme i�leminden sonra bloglar� tekrar �ek
                alert(data.message); // API'den gelen ba�ar�l� mesaj
            } else {
                alert(data.message || 'Blog silinirken bir hata olu�tu.'); // Hata mesaj�
            }
        } catch (err) {
            console.error('Silme hatas�:', err);
            alert('Bir hata olu�tu.');
        }
    };


    // G�ncelleme i�lemi
    const handleEdit = (blog) => {
        navigate(`/MyBlogEdit/${blog.blogId}`);

    };

    // Blog g�nder
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://localhost:7120/api/User/BlogAdd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setForm({ title: '', content: '' });
                fetchBlogs(); // Listeyi g�ncelle
            } else {
                console.error('Blog eklenemedi');
            }
        } catch (err) {
            console.error('Blog ekleme hatas�:', err);
        }
    };

    return (
        <div className="my-blog-container">
            <div className="my-blog-header">
                <h1>My Blog</h1>
            </div>

            <form className="blog-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ba�l�k"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="��erik"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                ></textarea>
                <button type="submit">Blogu Ekle</button>
            </form>

            <div className="blog-list">
                <h2>Bloglar</h2>
                {blogs.map((blog, index) => (
                    <div key={index} className="blog-item">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <small>{new Date(blog.date).toLocaleString()}</small>

                        {/* Silme ve G�ncelleme Butonlar� */}
                        <div className="button-container">
                            <button className="delete-button" onClick={() => handleDelete(blog.blogId)}>
                                Sil

                            </button>
                            <button className="edit-button" onClick={() => handleEdit(blog)}>
                                G�ncelle
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default MyBlog;

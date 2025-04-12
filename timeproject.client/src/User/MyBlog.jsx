import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MyBlog.css";

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const navigate = useNavigate();
    // Bloglarý çek
    const fetchBlogs = async () => {
        try {
            const res = await fetch(`https://localhost:7120/api/User/GetBlog`);
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error('Bloglarý çekerken hata:', err);
        }
    };

    // Sayfa yüklendiðinde bloglarý getir
    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        if (!blogId) {
            alert('Geçersiz blog ID');
            return;
        }

        try {
            const res = await fetch(`https://localhost:7120/api/User/BlogDelete/${blogId}`, {
                method: 'DELETE',
            });

            const data = await res.json(); // Hata mesajýný almak için JSON olarak parse et

            if (res.ok) {
                fetchBlogs(); // Silme iþleminden sonra bloglarý tekrar çek
                alert(data.message); // API'den gelen baþarýlý mesaj
            } else {
                alert(data.message || 'Blog silinirken bir hata oluþtu.'); // Hata mesajý
            }
        } catch (err) {
            console.error('Silme hatasý:', err);
            alert('Bir hata oluþtu.');
        }
    };


    // Güncelleme iþlemi
    const handleEdit = (blog) => {
        navigate(`/MyBlogEdit/${blog.blogId}`);

    };

    // Blog gönder
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
                fetchBlogs(); // Listeyi güncelle
            } else {
                console.error('Blog eklenemedi');
            }
        } catch (err) {
            console.error('Blog ekleme hatasý:', err);
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
                    placeholder="Baþlýk"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Ýçerik"
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

                        {/* Silme ve Güncelleme Butonlarý */}
                        <div className="button-container">
                            <button className="delete-button" onClick={() => handleDelete(blog.blogId)}>
                                Sil

                            </button>
                            <button className="edit-button" onClick={() => handleEdit(blog)}>
                                Güncelle
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default MyBlog;

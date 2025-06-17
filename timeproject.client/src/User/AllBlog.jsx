import React from 'react';
import BlogList from '../HomePage/BlogList';
import './AllBlog.css';

const AllBlogs = () => {
    return (
        <div className="all-blogs-page">
            <div className="all-blogs-header">
                <h1>Tüm Blog Yazıları</h1>
                <p>Topluluğumuzun paylaştığı tüm blog yazılarını keşfedin</p>
            </div>
            <BlogList />
        </div>
    );
};

export default AllBlogs; 
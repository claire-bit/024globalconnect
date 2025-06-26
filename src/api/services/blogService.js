import axios from 'axios';
import { API_ENDPOINTS } from '../endpoints'; // fixed path

// 🔐 Auth headers helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};
export const getUserBlogPosts = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.BLOG_MY_POSTS, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Fetching user blog posts failed:', error.response?.data || error.message);
    throw error;
  }
};


// ✅ Create a blog post
export const createBlogPost = async (postData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.BLOG_CREATE, postData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Blog post creation failed:', error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Update a blog post by ID
export const updateBlogPost = async (id, updatedData) => {
  try {
    const response = await axios.put(API_ENDPOINTS.BLOG_UPDATE(id), updatedData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Update blog post failed:', error.response?.data || error.message);
    throw error;
  }
};

// ❌ Delete a blog post by ID
export const deleteBlogPost = async (id) => {
  try {
    const response = await axios.delete(API_ENDPOINTS.BLOG_DELETE(id), getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Delete blog post failed:', error.response?.data || error.message);
    throw error;
  }
};

// 📄 Fetch all blog posts
export const getAllBlogPosts = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.BLOGS);
    return response.data;
  } catch (error) {
    console.error('Get all blog posts failed:', error.response?.data || error.message);
    throw error;
  }
};

// 📄 Fetch one blog post by ID
export const getBlogPostById = async (id) => {
  try {
    const response = await axios.get(API_ENDPOINTS.BLOG_UPDATE(id));
    return response.data;
  } catch (error) {
    console.error('Get blog post by ID failed:', error.response?.data || error.message);
    throw error;
  }
};

// 🚀 Publish a blog post
export const publishBlogPost = async (id) => {
  try {
    const response = await axios.post(API_ENDPOINTS.BLOG_PUBLISH(id), {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Publish blog post failed:', error.response?.data || error.message);
    throw error;
  }
};

import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAILURE,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAILURE,
} from '../Types/blogs';

export const fetchBlogsRequest = () => ({
  type: FETCH_BLOGS_REQUEST,
});

export const fetchBlogsSuccess = (blogs) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs,
});

export const fetchBlogsFailure = (error) => ({
  type: FETCH_BLOGS_FAILURE,
  payload: error,
});

export const createBlogRequest = (blogData) => ({
  type: CREATE_BLOG_REQUEST,
  payload: blogData,
});

export const createBlogSuccess = (blog) => ({
  type: CREATE_BLOG_SUCCESS,
  payload: blog,
});

export const createBlogFailure = (error) => ({
  type: CREATE_BLOG_FAILURE,
  payload: error,
});

export const updateBlogRequest = (blogId, blogData) => ({
  type: UPDATE_BLOG_REQUEST,
  payload: { blogId, blogData },
});

export const updateBlogSuccess = (blog) => ({
  type: UPDATE_BLOG_SUCCESS,
  payload: blog,
});

export const updateBlogFailure = (error) => ({
  type: UPDATE_BLOG_FAILURE,
  payload: error,
});

export const deleteBlogRequest = (blogId) => ({
  type: DELETE_BLOG_REQUEST,
  payload: blogId,
});

export const deleteBlogSuccess = (blogId) => ({
  type: DELETE_BLOG_SUCCESS,
  payload: blogId,
});

export const deleteBlogFailure = (error) => ({
  type: DELETE_BLOG_FAILURE,
  payload: error,
});

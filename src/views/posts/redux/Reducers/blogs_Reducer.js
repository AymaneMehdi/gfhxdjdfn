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

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
    case CREATE_BLOG_REQUEST:
    case UPDATE_BLOG_REQUEST:
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.payload],
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      };
    case FETCH_BLOGS_FAILURE:
    case CREATE_BLOG_FAILURE:
    case UPDATE_BLOG_FAILURE:
    case DELETE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;

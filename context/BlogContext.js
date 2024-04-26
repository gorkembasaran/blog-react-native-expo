import React, {useState , useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state,action) =>{
    switch(action.type){
        case 'get_blogposts':
            return action.payload
        case 'delete_blogpost':
            return state.filter((blogPost)=>blogPost.id !== action.payload)
        case 'edit_blogpost':
            return state.map((blogPost)=>{
                return blogPost.id === action.payload.id ? action.payload : blogPost
            })
        default: 
            return state;
    }
}
const addBlogPost = (dispatch) => {
    return async (title, content, callback)=>{
        // dispatch({type:'add_blogpost', payload :{ title, content} })
        await jsonServer.post('/blogposts', {
            title,
            content,
        });

        if(callback){
            callback();
        }
    }
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback)=>{
        await jsonServer.put(`/blogposts/${id}`, {
            title,
            content,
        });
        dispatch({type:'edit_blogpost', payload :{id, title, content} })
        if(callback){
            callback();
        }
    }
}

const getBlogPosts = (dispatch) => {
    return async ()=>{
        const response = await jsonServer.get('/blogposts')
        dispatch({ type : 'get_blogposts', payload : response.data})
    }
}

const deleteBlogPost = (dispatch) => {
    return async (id)=>{
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({type:'delete_blogpost', payload : id})
    }
}

        // setBlogPosts([...blogPosts,{title:'Vue.js'}])
// const [blogPosts, setBlogPosts] = useState([{
    //     title : 'React Native',
    // },
    // {
    //     title : 'Javascript'
    // }])
export const {Context, Provider}=createDataContext(blogReducer,{addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},[]);
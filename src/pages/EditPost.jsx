import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            appwriteService.getPost(id).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [id, navigate])
  return post ? (
    <div>
        <h1>Edit Post</h1>
        <form>
          <div>
            <label>Title</label>
            <input type="text" value={post.title} />
          </div>
          <div>
            <label>Content</label>
            <textarea value={post.content}></textarea>
          </div>
          <button type="submit">Update Post</button>
        </form>
    </div>
  ) : null
}

export default EditPost
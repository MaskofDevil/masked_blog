import { useState, useEffect } from 'react'
import BlogList from './BlogList'

const Home = () => {
    const [blogs, setBlogs] = useState(null)
    const [isPending, setPendingValue] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
                if (!res.ok) {
                    throw Error(`Code: ${res.status} Text : ${res.statusText}`)
                }
                return res.json()
            })
            .then(data => {
                setBlogs(data)
                setPendingValue(false)
                setError(null)
            })
            .catch(err => {
                setPendingValue(false)
                setError(err.message)
                setBlogs(null)
            })
    }, [])

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending === true && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs" />}
            {blogs && <BlogList blogs={blogs.filter((blog) => blog.author === 'author 2')} title="Author 2's blogs" />}
        </div>
    );
}

export default Home;
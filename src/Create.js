import { useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Author 1');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author }

    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
    }).then(() => {
        console.log('new blog added');
        setIsPending(false);
        history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Author 1">Author 1</option>
          <option value="Author 2">Author 2</option>
          <option value="Author 3">Author 3</option>
        </select>
        { !isPending && <button>Add Blog</button>}
        { isPending && <button disabled>Adding Blog...Please wait</button>}
      </form>
    </div>
  );
}
 
export default Create;
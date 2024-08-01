import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Create = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [author, setAuthor] = useState("mario")
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate();
  // const textareaRef = useRef(null);

  /*
    // Adjust the height of the textarea based on content
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto'; // Reset height to auto
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
      }
    }, [body]); // Run the effect when `body` changes
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    try {
      setIsPending(true);
      const response = await fetch("http://localhost:8000/blogs", {
        method: "POST", // Corrected "POSt" to "POST"
        headers: { // Corrected "header" to "headers"
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      console.log("SUBMITTED");
    } catch (error) {
      console.error("Error:", error);
    }
    setIsPending(false);
    navigate("/");
  }

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Blog title:</label>
        <input
          id=""
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="">Blog body:</label>
        <textarea
          name=""
          id=""
          required
          // ref={textareaRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label htmlFor="">Blog author:</label>
        <select
          name=""
          id=""
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        {!isPending && <button type="submit">Add blog</button>}
        {isPending && <button disabled>Adding blog......</button>}
      </form>

      <br />
      <div className="blog-preview">
        <div className="blog-details">
          <article>
            <h2>{title}</h2>
            <p>Written by {author}</p>
            <div>{body}</div>
          </article>
        </div>
      </div>

    </div>
  );
}

export default Create;
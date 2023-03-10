import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);
  const [title, setTitle] = useState("");
  const [type, setCategory] = useState("Movie");
  const [coverFile, setCoverFile] = useState("");
  const [year, setYear] = useState(2000);

  const [blogPost, setBlogPost] = useState(null);
  const url = process.env.REACT_APP_URL;

  const sendPost = async () => {
    try {
      let response = await fetch(url + "/medias");
      if (response.ok) {
        console.log(response);
        let authors = await response.json();
      } else {
        console.log("Error!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverUpload = async (id) => {
    try {
      const formData = new FormData();
      formData.append("cover", coverFile);
      let response = await fetch(`${url}/medias/${id}/poster`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("done!");
      } else {
        console.log("Try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (coverFile) {
      handleCoverUpload(blogPost.imdbID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogPost]);

  useEffect(() => {
    sendsPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendsPost = async () => {
    try {
      let newPost = {
        type: type,
        title: title,
        poster:
          "https://assets-prd.ignimgs.com/2021/12/14/spiderman-thumbnail-1639459552096.jpg?width=1280",
        year: year,
      };
      let response = await fetch(url + "/medias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        let post = await response.json();
        setBlogPost(post);
      } else {
        console.log("Error!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="new-blog-container">
      <Form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          sendPost();
        }}
      >
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>year</Form.Label>
          <Form.Control
            size="lg"
            placeholder="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={type}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Movie</option>
            <option>Series</option>
            <option> Documentary</option>
            <option>News</option>
            <option>Romantic</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setCoverFile(files);
              } else {
                setCoverFile(null);
              }
            }}
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;

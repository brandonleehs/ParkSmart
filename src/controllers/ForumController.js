import imageCompression from "browser-image-compression";
import axios from "axios";

export default class ForumController {
  constructor() {}

  createPost = async ({
    posts,
    setPosts,
    setTitle,
    setContent,
    setImage,
    user,
    image,
    title,
    content,
  }) => {
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("username", user.username);

    if (image) {
      formData.append("image", image); // Send the compressed file
    }

    axios
      .post(`http://localhost:${process.env.PORT}/api/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setPosts([...posts, res.data]);
        setTitle("");
        setContent("");
        setImage("");
      })
      .catch((err) => console.log(err));
  };

  handleImageChange = async (e, { setImage }) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Set compression options
        const options = {
          maxSizeMB: 1, // Limit image size to 1MB
          maxWidthOrHeight: 1024, // Resize to max 1024px width/height
          useWebWorker: true, // Enable multi-threading for faster processing
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Convert the compressed file to base64 (if needed)
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setImage(compressedFile); // Set the file (not base64) for upload
        };
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };
}

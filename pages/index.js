import axios from "axios"
import { useState } from "react";
import styles from "../styles/Home.module.css";
import ImagePreview from "../components/ImagePreview";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [collageId, setCollageId] = useState("");
  
  const handleChange = (e) => {
    for (const file of e.target.files) {
      setFiles((files) => [...files, file]);
    }
  };

  const handleDelete = (index) => {
    setFiles((files) => files.filter((file, i) => i !== index));
  };


const handleUpload = async () => {
  setStatus("loading...");
  setCollageId("");
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

//add the code in this try and catch block
  try {
    const res = await axios.post("/api/upload", formData);
    console.log(res.data);
    setStatus("Done");
  } catch (error) {
    setStatus("failed, try again");
  }
};

  return (
    <main className={styles.main}>
      <input
        type="file"
        multiple
        onChange={handleChange}
        onClick={e => e.currentTarget.value = null}
      />
      {files.length !== 0 && (
        <ImagePreview files={files} handleDelete={handleDelete} />
      )}
      <button
        onClick={handleUpload}
        disabled={files.length === 0 || status === "loading..."}
      >
        Generate Collage
      </button>
      <p>{status}</p>
    </main>
  );
}
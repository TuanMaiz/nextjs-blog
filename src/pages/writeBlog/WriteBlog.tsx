import dynamic from "next/dynamic";
const LazyMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false }); //make markdown editor render in client side
import "easymde/dist/easymde.min.css";
import { useCallback, useState } from "react";
import { Post } from "@/interfaces/post";
import { useSession, signIn, signOut } from "next-auth/react";

const WriteBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleTitleChange = () => {};
  const handleContentChange = () => {};
  return (
    <section className="w-full h-full mt-20 flex-container flex-col">
      <input
        id="title-input"
        className="w-[90%] px-2 h-12 rounded-lg"
        type="text"
        placeholder="Write your title here"
        value={title}
        onChange={handleTitleChange}
      />
      <div className="w-[90%] h-52 mt-4 rounded-lg">
        <LazyMDE
          id="content-input"
          className=""
          placeholder="Write your content here"
          value={content}
          onChange={handleContentChange}
        />
      </div>
    </section>
  );
};

export default WriteBlog;

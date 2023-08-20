import dynamic from "next/dynamic";
const LazyMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false }); //make markdown editor render in client side
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/interfaces/user";
import { createNewBlog } from "../api/createNewBlog";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface ErrorValidate {
  titleError: string;
  contentError: string;
}
const WriteBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<ErrorValidate>({
    titleError: "",
    contentError: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event: string) => {
    setContent(event);
  };
  const handleSaveDraft = () => {
    //save to localStorage
  };
  const handleCreatePost = async () => {
    //create post
    //to dos: handles error when title and content empty
    const isErrorExist = Object.values(error).some((v) => v !== "");
    if (session && !isErrorExist) {
      const token = session.accessToken;
      const user = session.user as User;
      const userId = user.id;
      const post = {
        title: title,
        content: content,
        userId: userId,
        accessToken: token,
      };
      // console.log(post);

      const response = await createNewBlog({ ...post });
      if (response) {
        if (response.status === 200) {
          const { slug } = response.data;
          toast("Your post was created successfully", {
            hideProgressBar: true,
            autoClose: 1000,
            type: "success",
          });
          setTimeout(() => {
            router.push(`/post/${slug}`);
          }, 1100);
        } else {
          toast("Something went wrong", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        }
      }
    }
    else{
      toast("Something went wrong. Check if your title or content blank", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  };
  useEffect(() => {
    setError((prevState) => ({
      ...prevState,
      titleError: !title ? "Title must not left blank" : "",
      contentError: !content ? "Content must not left blank" : "",
    }));
  }, [title, content]);
  return (
    <section className="w-full h-full mt-20 flex-container flex-col">
      <div className="w-full h-full flex-container flex-col">
        <input
          id="title-input"
          className="w-[90%] px-2 h-12 rounded-lg"
          type="text"
          placeholder="Write your title here"
          value={title}
          onChange={(e) => handleTitleChange(e)}
        />
        {error?.titleError && <p className="text-red-600">{error.titleError}</p>}
        <div className="w-[90%] h-full mt-4 rounded-lg">
          <LazyMDE
            id="content-input"
            className=""
            placeholder="Write your content here"
            value={content}
            onChange={handleContentChange}
          />
        {error?.contentError && <p className="text-red-600">{error.contentError}</p>}

        </div>
      </div>
      <div className="w-[90%] flex items-center justify-end">
        <button className="secondary-btn mx-4 py-2" onClick={handleSaveDraft}>
          Save draft
        </button>
        <button className="primary-btn px-4 py-2" onClick={handleCreatePost}>
          Create post
        </button>
      </div>
    </section>
  );
};

export default WriteBlog;

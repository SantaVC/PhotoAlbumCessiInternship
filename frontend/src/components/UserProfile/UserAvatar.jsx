import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const UserAvatar = () => {
  const [url, setUrl] = useState();

  const handleUpload = (event) => {
    const blob = new Blob([event.target.files[0]], { type: "profilePicture" });

    if (blob?.size < 10) {
      return;
    }

    setUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="shrink-0 flex items-center justify-center w-32 h-32 rounded-full overflow-hidden border-2 border-neutral-800 dark:border-sky-300">
      <label
        className="w-full h-full flex items-center justify-center cursor-pointer"
        htmlFor="userAvatar"
      >
        <input
          type="file"
          id="userAvatar"
          onChange={handleUpload}
          className="hidden"
        />

        {!url ? (
          <IoIosAddCircleOutline
            className="text-neutral-800 dark:text-sky-300"
            size={50}
          />
        ) : (
          <img
            src={url}
            className="object-cover h-full"
            alt="Profile picture"
          />
        )}
      </label>
    </div>
  );
};

export default UserAvatar;

import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const UserAvatar = () => {
  const [url, setUrl] = useState();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setUrl(URL.createObjectURL(file));
  };

  return (
    <div className="shrink-0 flex items-center justify-center w-32 h-32 rounded-full bg-neutral-500 overflow-hidden">
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
          <IoIosAddCircleOutline color="white" size={50} />
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

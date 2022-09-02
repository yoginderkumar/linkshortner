import React, { useState } from "react";
import Toast from "../components/Toast";
import LinksList from "../components/LinksList";
import { copyToClipboard, validateUrl } from "../utils";

const Home = () => {
  const [userInputUrl, setUserInputUrl] = useState("");
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [isLinkShorteningInProgress, setIsLinkShorteningInProgress] =
    useState(false);
  const shortenLinkHandler = async () => {
    if (!validateUrl(userInputUrl)) {
      return setError("Please enter a valid email!");
    }
    if (shortenedLinks.includes(userInputUrl)) {
      return setError("You are not allowed to add already shortened link!");
    }
    setIsLinkShorteningInProgress(true);
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${userInputUrl}`
      );
      const jsonedData = await response.json();
      setShortenedLinks((prevLinks) => [
        ...prevLinks,
        jsonedData.result.full_short_link,
      ]);
      setUserInputUrl("");
      setIsLinkShorteningInProgress(false);
    } catch (e) {
      setError("Something went wrong. Please try again later!");
      setIsLinkShorteningInProgress(false);
    }
  };

  const copyClickHandler = (link) => {
    copyToClipboard(link);
    setCopySuccess(`Copied ${link} successfully to your clipboard!`);
  };

  return (
    <>
      {error.length ? (
        <Toast
          type="error"
          title={"Error occurred"}
          description={error}
          onClose={() => setError("")}
        />
      ) : copySuccess.length ? (
        <Toast
          type="success"
          title={"Copied"}
          description={copySuccess}
          onClose={() => setCopySuccess("")}
        />
      ) : null}
      <div className="container h-screen flex flex-column pt-10 items-center">
        <div className="text-center">
          <h1 className=" text-2xl font-medium text-blue-500 mb-4">
            Our <span className=" text-yellow-400">URL Shortener</span>
          </h1>
          <div>
            <input
              className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-2 py-2"
              type="text"
              value={userInputUrl}
              onChange={(e) => setUserInputUrl(e.target.value)}
              placeholder="Enter link to be shortened"
            />
            <button
              disabled={isLinkShorteningInProgress || !userInputUrl.length}
              className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-md"
              onClick={shortenLinkHandler}
            >
              {isLinkShorteningInProgress ? (
                <div className="h-full">
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-8 h-8 animate-spin text-white fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Processing...</span>
                </div>
              ) : (
                "Submit URL"
              )}
            </button>
          </div>
        </div>
        <LinksList links={shortenedLinks} copyClickHandler={copyClickHandler} />
      </div>
    </>
  );
};

export default Home;

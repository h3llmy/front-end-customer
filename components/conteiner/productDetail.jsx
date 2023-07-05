import { useState, useEffect } from "react";
import axios from "axios";
import JSZip from "jszip";
import ProgressBar from "../loading/progressBar";
import LoadingAnimation from "../loading/loadingAnimation";
import errorHanddler from "../../utils/errorHanddler";
import { getLoginCookie } from "../../utils/cookie";

const ProductDetail = ({ name, defaultValue, process, downloadAble }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoadingProgress(process);
  }, [process]);

  const fetchFile = async () => {
    let cookie = await getLoginCookie("user");
    let config = {};

    if (cookie) {
      config.headers = {
        Authorization: `Bearer ${cookie}`,
      };
    }

    try {
      if (defaultValue && Array.isArray(defaultValue)) {
        const files = await Promise.all(
          defaultValue.map(async (value) => {
            const fileName = value.split(/[/|-]+/).pop();
            const response = await axios.get(value, {
              responseType: "blob",
              onDownloadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setLoadingProgress(percentCompleted);
              },
              ...config,
            });

            return new File([response.data], fileName, {
              type: response.data.type,
            });
          })
        );

        setSelectedFiles([...files]);
        setCurrentSlide(0);
      }
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [defaultValue]);

  const handleDownloadSelectedFile = (event) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(selectedFiles[currentSlide]);
    link.download = selectedFiles[currentSlide].name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllFile = async (event) => {
    event.preventDefault();
    const zip = new JSZip();
    selectedFiles.forEach((file) => {
      zip.file(file.name, file);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${name.replace(" ", "-")}-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + selectedFiles.length) % selectedFiles.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % selectedFiles.length);
  };

  return (
    <div>
      {name && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {name}
        </label>
      )}
      <div className="relative w-full">
        {selectedFiles.length > 1 && (
          <>
            <button
              type="button"
              className="group absolute left-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
              onClick={(event) => {
                event.preventDefault();
                handlePrevSlide(event);
              }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-[#262626] hover:dark:bg-[#737373] opacity-40">
                &#10094;
              </div>
            </button>
            <button
              type="button"
              className="group absolute right-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
              onClick={(event) => {
                event.preventDefault();
                handleNextSlide(event);
              }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-[#262626] hover:dark:bg-[#737373] opacity-40">
                &#10095;
              </div>
            </button>
          </>
        )}
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 rounded-lg bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            {selectedFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {errorMessage ? (
                  <div className="text-[#FF0000] font-semibold mb-2">
                    {errorMessage}
                  </div>
                ) : (
                  <LoadingAnimation />
                )}
              </div>
            ) : (
              selectedFiles.length > 0 &&
              selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`h-full flex items-center justify-center ${
                    index === currentSlide ? "active" : "hidden"
                  }`}
                >
                  {file.type.includes("image/") ? (
                    <img
                      className="object-contain h-full"
                      src={file.url || URL.createObjectURL(file)}
                      alt={file.name}
                    />
                  ) : file.type.includes("audio/") ? (
                    <audio controls controlsList="nodownload">
                      <source
                        src={file.url || URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </audio>
                  ) : file.type.includes("video/") ? (
                    <video
                      className="object-contain h-full"
                      controls
                      controlsList="nodownload"
                    >
                      <source
                        src={file.url || URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                      </svg>
                      <div className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">File Name:</span>
                        <p>{file.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        {<ProgressBar progress={loadingProgress} />}
        <div className="flex items-center justify-center w-full">
          {selectedFiles.length > 0 && downloadAble && (
            <div className="flex space-x-5">
              <button onClick={handleDownloadSelectedFile}>
                {selectedFiles.length > 1 ? "Download Single File" : "Download"}
              </button>
              {selectedFiles.length > 1 && (
                <button onClick={handleDownloadAllFile}>
                  Download All File
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

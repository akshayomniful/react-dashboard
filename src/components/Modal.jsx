import React, { useState } from "react";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSideModal = () => {
    setIsSideModalOpen(true);
  };

  const closeSideModal = () => {
    setIsSideModalOpen(false);
  };

  return (
    <div className="font-sans p-5">
      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isModalOpen || isSideModalOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Modal - Centered
          </button>

          <button
            onClick={openSideModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Side Modal
          </button>
        </div>
      </div>

      {/* Center Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Centered Modal</h2>
              <p className="text-gray-700 mb-2">
                This modal is in center of the screen.
              </p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget felis eu nisi tincidunt ultrices.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side Modal */}
      {isSideModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white h-full w-full max-w-xs sm:max-w-md shadow-lg transform transition-transform duration-300 animate-slide-in">
            <div className="p-6 h-full flex flex-col">
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-4">Side Modal</h2>
                <p className="text-gray-700 mb-4">
                  This modal slides in from the side of the screen.
                </p>

                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  doloremque voluptatem, aliquam ut animi quaerat officiis unde?
                </p>
              </div>
              <div className="pt-4 border-t mt-4">
                <button
                  onClick={closeSideModal}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add the animation for slide-in */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Modal;

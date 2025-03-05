import { createContext, useContext, useEffect, useState } from 'react';

const ModalContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();

  const openPopup = (content) => {
    setIsShowing(true);
    setContent(content);
  };

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [isShowing]);

  return (
    // các biến để trong value thì các con cháu được bọc bằng context  này thì sẽ đều truy xuất đến và sử dụng được
    <ModalContext.Provider value={{ openPopup }}>
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
            onClick={() => setIsShowing(!isShowing)}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

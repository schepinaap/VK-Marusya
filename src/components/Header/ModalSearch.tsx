import React from "react";
import Search from "./Search";
import "./modalSearch.css";

interface ModalSearchProps {
    handleMobileSearch: () => void;
}

function ModalSearch({ handleMobileSearch }: ModalSearchProps) {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const modal = e.target as HTMLDivElement;
    if (modal.getAttribute("data-modal")) {
      handleMobileSearch();
    }
  };

  return (
    <div className="modal" data-modal onClick={handleClose}>
      <div className="modal-content">
        <Search handleMobileSearch={handleMobileSearch} />
      </div>
    </div>
  );
}

export default ModalSearch;

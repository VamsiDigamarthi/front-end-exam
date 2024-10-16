import React, { useEffect, useState } from "react";
import "./OpenPdf.css";
import pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.min";
import { RxCross1 } from "react-icons/rx";
import { Document, Page } from "react-pdf";
import { APIURL } from "../../../../../Core/urls";
const OpenPdf = ({ material, setAddTodoModalOpenState }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  const pdf = `${APIURL}/${material?.pdf}`;

  console.log(pdf);

  return (
    <div className="all-modal-main-card">
      <div className="all-modal-inside-section own-pdf-width">
        <div className="all-modal-closing-card">
          <h4>
            {material.courseName} - {material.topic}
          </h4>
          <RxCross1 onClick={() => setAddTodoModalOpenState(false)} />
        </div>

        <div className="pdf-div">
          <p className="page-number-card">
            Page {pageNumber} of {numPages}
          </p>
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => {
                return (
                  <Page
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={window.innerWidth * 0.87}
                  />
                );
              })}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default OpenPdf;

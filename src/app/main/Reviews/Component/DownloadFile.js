import React, { useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadFile = ({ reviewData }) => {
  const pdfRef = useRef();

  const downloadPDF =()=>{
    const input = pdfRef.current;
    html2canvas(input).then((canvas)=>{
      const imgData = canvas.toDataURL('image/png');
      const pdf= new jsPDF("p","mm","a4",true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth/imgWidth , pdfHeight/ imgWidth)
      const imgX= (pdfWidth - imgWidth * ratio / 2)
      const imgY = 30;
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth * ratio, imgHeight * ratio);
      pdf.save(invoice.pdf)
    })

  }

  return (
    <div ref={pdfRef}>

    </div>
  );
};

export default DownloadFile;



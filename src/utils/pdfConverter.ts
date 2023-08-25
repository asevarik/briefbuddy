import jsPDF from 'jspdf';
import {marked} from 'marked';

export const generateAndDownloadPDF = (markdownContent:string) => {
  const doc = new jsPDF();

  // Convert markdown to plain text
  const plainText = marked.parse(markdownContent, { sanitize: true });

  doc.text(plainText,10, 10);

  doc.save('markdown.html');
};

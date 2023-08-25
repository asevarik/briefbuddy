import { marked } from "marked";

export const convertAndSaveMarkdown = (markdownContent:string, filename:string) => {
    const htmlContent = marked(markdownContent);
  
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${filename}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
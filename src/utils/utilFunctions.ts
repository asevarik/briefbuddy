import { NestedMenuItem } from "../components/PromptMenu";
import { getExpectedResponse, getPrompt } from "../store/MarkdownDataHandler";

const headings = [
    "News Article",
    "Scientific Paper",
    "Historical Text",
    "Technical Document",
    "Literary Text",
    "Legal Document",
    "Educational Article",
    "Business Report",
    "Medical Paper",
    "Social Media Post",
    "General Document"
  ];

const expected_Points = [
    "points",
    "paragraphs"
]
export const getpromptsData:NestedMenuItem[] = headings.map((heading,index)=>{
    const currentPrompt = getPrompt()
    if(currentPrompt == index+1){
        return {
            title: heading,
            isChecked: true,
            id:index+1
        }
    }
    return {
        title: heading,
        isChecked: false,
        id:index+1
    }
}) 



export const summaryType:NestedMenuItem[] = expected_Points.map((item,index)=>{
    const currentSummary = getExpectedResponse()    
    if(currentSummary == item){
        return{
            title: item,
            isChecked: true,
            id:index
        }
    }
    return {
        title: item,
        isChecked: false,
        id:index
    }
})

export function downloadMarkdownFile(content:string, fileName:string) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
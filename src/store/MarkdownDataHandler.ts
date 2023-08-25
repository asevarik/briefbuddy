import { create } from "zustand";
import { EXPECTED_RESPONSE, PROMPT } from "../utils/contants";

interface IMarkdownDataHandler{
    mdContent: string;
    prompt:number;
    expected_response:string;
    saveMdContent:(newContent:string) => void;
    changePrompt:(newPrompt:number) => void;
    changeExpectedResponse:(newExpectedResponse:string) => void;
}

export enum Prompt{
    news_article = 1,
    scientific_paper = 2,
    historical_text = 3,
    technical_document = 4,
    literary_text = 5,
    legal_document = 6,
    educational_article = 7,
    business_report = 8,
    medical_paper = 9,
    social_media_post = 10,
    general_document = 11,
}

export const getPrompt = ():number=>{
    let result = localStorage.getItem(PROMPT)
    if(result){
        return parseInt(result)
    }else{
        return 11
    }
}

export const getExpectedResponse = ():string=>{
    let result = localStorage.getItem(EXPECTED_RESPONSE)
    if(result){
        return result
    }else{
        return "paragraphs"
    }
}

export const markdownContent ="# Watch Now\n\nThis tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: [https://realpython.com/courses/python-rest-apis-with-fastapi/](https://realpython.com/courses/python-rest-apis-with-fastapi/)\n\n## Introduction\n\nCreating APIs, or application programming interfaces, is an important part of making your software accessible to a broad range of users. In this tutorial, you will learn the main concepts of FastAPI and how to use it to quickly create web APIs that implement best practices by default. By the end of it, you will be able to start creating production-ready web APIs, and you will have the understanding needed to go deeper and learn more for your specific use cases.\n\n## What You'll Learn\n\nIn this tutorial, you’ll learn how to:\n- Use path parameters to get a unique URL path per item\n- Know the basics of [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview), [JSON](https://realpython.com/python-json/), and [Python types](https://fastapi.tiangolo.com/python-types/)\n- Benefit from using a [Python virtual environment](https://realpython.com/python-virtual-environments-a-primer/) for your Python projects\n\n## Free Bonus\n\n[Python Mastery Course](https://realpython.com/bonus/python-mastery-course/) - a free course for Python developers that shows you the roadmap and the mindset you’ll need to take your Python skills to the next level.\n\n## FastAPI Overview\n\nFastAPI is a modern, high-performance web framework for building APIs with Python based on standard type hints. It provides automatic data parsing, validation, serialization, and documentation.\n\n## Getting Started\n\nTo get started with FastAPI, follow these steps:\n\n1. Create a virtual environment\n   ```bash\n   $ python -m pip install fastapi uvicorn[standard]\n   ```\n\n2. Define your application in `main.py`:\n   ```python\n   from fastapi import FastAPI\n\n   app = FastAPI()\n\n   @app.get(\"/\")\n   async def root():\n       return {\"message\": \"Hello World\"}\n   ```\n\n3. Define a path parameter in your endpoint:\n   ```python\n   from fastapi import FastAPI\n\n   app = FastAPI()\n\n   @app.get(\"/items/{item_id}\")\n   async def read_item(item_id: int):\n       return {\"item_id\": item_id}\n   ```\n\n4. Define a request body parameter in your endpoint:\n   ```python\n   from typing import Optional\n   from fastapi import FastAPI\n   from pydantic import BaseModel\n\n   class Item(BaseModel):\n       name: str\n       description: Optional[str] = None\n       price: float\n       tax: Optional[float] = None\n\n   app = FastAPI()\n\n   @app.post(\"/items/\")\n   async def create_item(item: Item):\n       return item\n   ```\n\n## API Documentation\n\nFastAPI provides multiple ways to show the API documentation, including automatic integration with Swagger UI. Path parameters and JSON request bodies are automatically validated and documented.\n\n![Swagger UI](https://files.realpython.com/media/fastapi-body-image02.e1a560532c37.png)\n\n## Conclusion\n\nFastAPI is a powerful web framework that simplifies the process of creating APIs in Python. By leveraging Python's type hints, FastAPI provides automatic data validation, serialization, and documentation, making it easy to create production-ready web APIs. FastAPI can cover most of the use cases required for back-end frameworks, even those that are not strictly APIs. Take full advantage of FastAPI by learning more about modern Python features."
// In Markdown format, the above description of Zustand provides an overview of its features and benefits. You can use this format to present information about Zustand in a more readable and structured manner.  `;
// //# Creating APIs with FastAPI\n\nThis tutorial introduces FastAPI, a Python framework for creating web APIs. The tutorial covers the main concepts of FastAPI and demonstrates how to use it to quickly create web APIs that implement best practices by default. \n\nSome key points from the tutorial include:\n\n- FastAPI is a powerful framework for creating web APIs that focuses on speed and code quality.\n- Path parameters can be used to create unique URL paths for each item.\n- FastAPI supports type hints for path parameters and request bodies, allowing for automatic data validation, serialization, and documentation.\n- To get started with FastAPI, you need to install it using pip and import it in your code.\n\nFor more detailed instructions and examples, you can check out the tutorial and the related video course created by the Real Python team: [Python REST APIs with FastAPI](https://realpython.com/courses/python-rest-apis-with-fastapi/)`

export const MarkdownDataHandler=create<IMarkdownDataHandler>()((set)=>({
    mdContent:'',
    prompt:getPrompt(),
    expected_response:getExpectedResponse(),
    saveMdContent:(newContent:string)=>set({mdContent:newContent}),
    changePrompt:(newPrompt:number)=>{
        localStorage.setItem(PROMPT,newPrompt.toString())
        set({prompt:newPrompt})
    },
    changeExpectedResponse:(newExpectedResponse:string) => {
        console.log("🚀 ~ file: MarkdownDataHandler.ts:56 ~ MarkdownDataHandler ~ newExpectedResponse:", newExpectedResponse)
        localStorage.setItem(EXPECTED_RESPONSE,newExpectedResponse)
        set({expected_response:newExpectedResponse})}
}
)
)
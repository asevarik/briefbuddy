import axios from "axios";
import { BASE_URL, apiEndPoints } from "./apiEndpoints";
import { GetSummaryModel } from "../models/getSummaryModel";

const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };
export const get_summary = async (requestModel:GetSummaryModel):Promise<string>=>{
    console.log("🚀 ~ file: apiservices.ts:10 ~ constget_summary= ~ requestModel:", requestModel)
    try{
       const response = await axios.post(BASE_URL+apiEndPoints.getSummary,requestModel,{headers})
       console.log("🚀 ~ file: apiservices.ts:8 ~ constget_summary= ~ response:", response)
       return response.data.message;
    }catch(error){
        console.log("🚀 ~ file: apiservices.ts:10 ~ constget_summary= ~ error:", error)
        throw "false"
    }
}



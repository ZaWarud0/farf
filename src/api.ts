import axios from 'axios';
import { AssetForm } from './types';

// Create an axios instance with base URL set
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
});

/**
 * Returns an object after promise is resolved
 * @remarks - If an error occured error will be filled and vice versa
 * @param promise - promise of any type
 * @returns an object of with data and error keys
 */
async function resolve(promise: Promise<any>) {

    const resolved = {
      data: null,
      error: null
    };
  
    try {
      resolved.data = await promise;
    } catch(e) {
        console.log(e);
        
      resolved.error = e;
    }
  
    return resolved;
  }

// Call endpoints with the axios instance


// Call the endpoint /forms to get a list of all forms
export async function getForms() {
    return await resolve(instance.get("/forms").then(res => res.data));
}

// Call the /forms/latest endpoint to get the latest reqNo
export async function getLatestReqNo() {
    return await resolve(instance.get("/forms/latest").then(res => res.data));
}

// Post to the /forms endpoint to add a new form
export async function addForm(form: AssetForm) {
    return await resolve(instance.post("/forms", { form }).then(res => res.data));
}

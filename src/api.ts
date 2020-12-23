import axios from 'axios';
import { AssetForm } from './types';

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
});

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

export async function getForms() {
    return await resolve(instance.get("/forms").then(res => res.data));
}

export async function getLatestReqNo() {
    return await resolve(instance.get("/forms/latest").then(res => res.data));
}

export async function addForm(form: AssetForm) {
    return await resolve(instance.post("/forms", { form }).then(res => res.data));
}

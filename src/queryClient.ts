import { QueryClient } from 'react-query'
// import { getTodos, postTodo } from '../my-api'

type AnyOBJ = {[key: string]:any}

export const getClient = (()=>{
  let client: QueryClient | null = null;
  return ()=>{
    if(!client) 
      client = new QueryClient({
        defaultOptions: {
          queries:{
            cacheTime: 1000 * 60 * 60 * 24, // 1초 * 60초 = 1분 * 60분 = 1시간 * 24시간 = 하루
            staleTime: 1000 * 60, // 1초
            // 쓸데없는 요청 다 없애기
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
          }
        }
      })
    return client
  }
})()

const BASE_URL = 'https://fakestoreapi.com'
export const fetcher =async ({
  method,
  path,
  body,
  params,
}:{
  method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH';
  path: string;
  body?: AnyOBJ; // post, put
  params?: AnyOBJ; 
}) => {
  try{
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Ofigin': BASE_URL
      }
    }
    if(params){
      const searchParams = new URLSearchParams(params);
      url += '?' + searchParams.toString();
    }

    if(body) fetchOptions.body = JSON.stringify(body);

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err)
  }
}

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
}
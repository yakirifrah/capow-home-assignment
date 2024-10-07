const endPoint = 'http://localhost:3003/api'

export const apis = {
  GET_ALL_DEVICE: `${endPoint}/device`,
  CREATE_DEVICE: `${endPoint}/device`,
  GET_DEVICE: (id:string)=> `${endPoint}/device/${id}`,
  UPDATE_DEVICE: (id:string)=> `${endPoint}/device/${id}`,
  DELETE_DEVICE: (id:string)=> `${endPoint}/device/${id}`,
}
import api from './api'

export const getAllProducts = () => {
  return api.get(`/product/findAll`);
};

export const getProductById = (id) => {
    return api.get(`/product/find/${id}`);
}

export const createProduct = (product) => {
    return api.post(`/product/save`,product);
}

export const updateProduct = (id,product) => {
    return api.put(`/product/update/${id}`,product,{
    headers: {
      "Content-Type": "application/json"
    }
  })

}

export const deleteProduct = (id) => {
    return api.delete(`/product/delete/${id}`);
}
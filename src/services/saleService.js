import api from './api'

export const getAllSales = () => {
  return api.get(`/sale/findAll`);
};

export const getSalesWithDetails = () => {
  return api.get(`/sale/withDetails`);
};

export const getSaleById = (id) => {
    return api.get(`/sale/find/${id}`);
}

export const createSale = (sale) => {
    return api.post(`/sale/save`,sale, {
      headers: {
        "Content-Type": "application/json"
      }
    });
}

export const updateSale = (id,product) => {
    return api.put(`/sale/update/${id}`,product,{
    headers: {
      "Content-Type": "application/json"
    }
  })

}

export const deleteSale = (id) => {
    return api.delete(`/sale/delete/${id}`);
}
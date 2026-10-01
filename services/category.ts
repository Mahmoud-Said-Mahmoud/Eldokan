
const API_BASE_URL = 'https://www.eldokan.com/wp-json/eldokan-customer/v1'; 


export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  
      cache: 'no-store', 
    });

   

    const data = await response.json();
    return data;
  }catch{
    console.log("error")
  }
}

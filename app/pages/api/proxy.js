// /pages/api/proxy.js
export default async function handler(req, res) {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.mweb.co.za/fibre/products');
      const data = await response.json();
  
      // Return the data as JSON
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
  
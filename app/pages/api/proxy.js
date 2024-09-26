// lib/api.js
import axios from 'axios';

const API_BASE_URL = 'https://apigw.mweb.co.za/prod/baas/proxy';

export const fetchFibreProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marketing/products/promos//FTTH-VUMA-12MONTH-CLAWBACK-25MBPS,FTTH-OCTOTEL-SEP-PROMO,FTTH-THINKSPEED-ALT-SEP-PROMO,FTTH-CLEARACCESS-SEP-PROMO,FTTH-FROG-SEP-PROMO,FTTH-CCC-SETUP-100MBUP,FTTH-TTCONNECT-SEP-PROMO,FTTH-LINKAFRICA-SEP-PROMO,FTTH-LIGHTSTRUCK-SEP-PROMO,FTTH-MFN-NOVA-SEP-PROMO,FTTH-FROGFOOTAIR-CLAWBACK,FTTH-ZOOM-SEP-PROMO,FTTH-OPEN-SEP-PROMO,FTTH-THINKSPEED-CLARA-SEP-PROMO,FTTH-BALWIN-SEP-PROMO,FTTH-THINKSPEED-SEP-PROMO,FTTH-LINKLAYER-SEP-PROMO,FTTH-VUMA-SEP-PROMO,FTTH-WEBCONNECT-M2M,FTTH-EVOTEL-SEP-PROMO,FTTH-VODA-SEP-PROMO,FTTH-MFN-SEP-PROMO?sellable_online=true`); // add the correct promo URL here
    return response.data;
  } catch (error) {
    console.error('Error fetching fibre products:', error);
    throw error;
  }
};

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marketing/campaigns/fibre?channels=120&visibility=public`); // add the correct campaigns URL here
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

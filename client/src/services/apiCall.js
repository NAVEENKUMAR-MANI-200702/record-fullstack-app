import API from './api';

const makeApiCall = async ({ url, method = 'GET', data }) => {
  try {
    const res = await API({
      url,
      method,
      data,
    });

    return res.data;
  } catch (error) {
    console.error('API Error:', error);

    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong',
    };
  }
};

export default makeApiCall;
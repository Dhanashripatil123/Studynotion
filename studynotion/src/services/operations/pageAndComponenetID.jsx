import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

const getCategoriesPageData = async (categoryId) => {
    // guard against invalid categoryId
    if (!categoryId) return null;

    const toastId = toast.loading('Loading...');
    let result = null;
    try {
        const response = await apiConnector('POST', catalogData.CATALOGPAGEDATA_API, { categoryId });
        if (!response?.data?.success) throw new Error(response?.data?.message || 'Could not fetch catalog page data');
        // Return the full response data (server uses `data` key)
        result = response.data;
    } catch (error) {
        console.error('CATALOG PAGEDATA API ERROR...', error);
        toast.error(error?.message || 'Failed to load catalog page data');
        result = error.response?.data || null;
    }
    toast.dismiss(toastId);
    return result;
}

export default getCategoriesPageData
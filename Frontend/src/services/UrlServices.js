import axios from 'axios';
import { host } from '../globalVar';

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const changeLinkStatus = async (id) => {
    try {
        const user = getUser()

        if (id && user && user.id) {
            const response = await axios.post(`${host}/change-url-status/${id}`, null, {
                headers: {
                    user_id: user.id
                }
            });

            console.log("Response from backend:", response.data);
            return response.data;
        } else {
            console.warn("Missing ID or User ID");
        }

    } catch (error) {
        console.error("Error in changeLinkStatus:", error);
    }
};

export const deleteUrlUsingId = async (id) => {
    try {
        const user = getUser()
        if (id && user && user.id) {
            const response = await axios.delete(`${host}/url/${id}`);

            console.log(response)
            return response.data
        }
    } catch (error) {
        console.error("Error in deleting URL", error.message);
    }
};

export const createNewUrl = async (newUrl, customAlias) => {
    try {

        const user = getUser();
        let response;

        if (newUrl) {
            response = await axios.post(
                `${host}/create-new-url`,
                { url: newUrl, alias: customAlias }, {
                headers: {
                    user_id: user.id
                }
            }
            );
            console.log(response.data?.link);

            return response.data?.link;
        } else {
            console.error("Please enter a URL");
        }
    } catch (error) {
        console.error("Error adding new url", error.message)
        return
    }
};

export const editUrl = async ({ id, newUrl, customAlias }) => {
    try {

        const user = getUser();

        if (id && newUrl) {
            const response = await axios.put(
                `${host}/update-url/${id}`,
                { newUrl, customAlias },
                {
                    headers: {
                        user_id: user.id,
                    },
                }
            );

            console.log(response)

            return response.data?.link;
        } else {
            return "url or id missing"
        }

    } catch (error) {
        console.error("Error: ", error.message)
    }
}
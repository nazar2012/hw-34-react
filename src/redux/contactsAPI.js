
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchContactsAPI = async () => {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Не вдалося завантажити контакти");
    }

    return response.json();
};

export const addContactAPI = async (contact) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (!response.ok) {
        throw new Error("Не вдалося додати контакт");
    }

    return response.json();
};

export const deleteContactAPI = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Не вдалося видалити контакт");
    }

    return id;
};

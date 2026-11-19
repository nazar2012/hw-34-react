
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchContactsAPI,
    addContactAPI,
    deleteContactAPI,
} from "./contactsAPI";

// GET
export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            return await fetchContactsAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// POST
export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
        try {
            return await addContactAPI(contact);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkAPI) => {
        try {
            return await deleteContactAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    contacts: {
        items: [],
        isLoading: false,
        error: null,
    },
    filter: "",
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,

    reducers: {
        changeFilter: (state, action) => {
            state.filter = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // FETCH CONTACTS
            .addCase(fetchContacts.pending, (state) => {
                state.contacts.isLoading = true;
                state.contacts.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = action.payload;
            })

            // ADD CONTACT
            .addCase(addContact.pending, (state) => {
                state.contacts.isLoading = true;
                state.contacts.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = action.payload;
            })

            // DELETE CONTACT
            .addCase(deleteContact.pending, (state) => {
                state.contacts.isLoading = true;
                state.contacts.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.items = state.contacts.items.filter(
                    (contact) => contact.id !== action.payload
                );
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = action.payload;
            });
    },
});

export const { changeFilter } = contactsSlice.actions;

export default contactsSlice.reducer;

import create from "zustand";
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
    userProfile : null | {
        _id: string;
        _type: string,
        userName: string,
        image: string,
    };
    allUsers: any;
    addUser: any;
    removeUser: any;
    fetchAllUsers: () => void;
  }

const authStore = (set: any): User => ({
    userProfile: null,
    allUsers: [],
    addUser: (user: User) => set({ userProfile: user }),
    removeUser: () => set({userProfile: null}),

    fetchAllUsers: async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
        set({ allUsers: response.data })
    }
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;
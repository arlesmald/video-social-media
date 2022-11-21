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
    addUser: any;
    removeUser: any;
  }

const authStore = (set: any): User => ({
    userProfile: null,

    addUser: (user: User) => set({ userProfile: user }),
    removeUser: () => set({userProfile: null})
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;
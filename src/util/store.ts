import { create } from 'zustand';
import { ProcessStatus } from '../api/api';

interface ProcessStatusState {
    status: {[name: string]: ProcessStatus};
    update: (val: {[name: string]: ProcessStatus}) => void;
    updateWithName: (name: string, val: ProcessStatus) => void
    reset: () => void
}

export const useProcessStore = create<ProcessStatusState>((set) => ({
    status: {},
    update: (val) => {
        set(({status: val}));
    },
    updateWithName: (name, val) => {
        set((prevState) => ({...prevState, [name]: val}));
    },
    reset: () => {set({})}
}));
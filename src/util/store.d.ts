import { ProcessStatus } from '../api/api';
interface ProcessStatusState {
    status: {
        [name: string]: ProcessStatus;
    };
    update: (val: {
        [name: string]: ProcessStatus;
    }) => void;
    updateWithName: (name: string, val: ProcessStatus) => void;
    reset: () => void;
}
export declare const useProcessStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ProcessStatusState>>;
export {};

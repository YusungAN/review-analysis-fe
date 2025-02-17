import { useState, ChangeEvent } from 'react';

const useInput = (initialValue: string, onChangeAction?: (...args: any[]) => void) => {
    const [value, setValue] = useState<string>(initialValue);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChangeAction !== undefined) onChangeAction(event.target.value);
    };

    const changeValueManually = (_value: string) => {
        setValue(_value);
    }
  
    return { value, onChange: handleChange, changeValue: changeValueManually };
};
  
export default useInput;
  
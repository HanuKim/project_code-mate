import { useRef } from "react";

const useInputRef = () => {
  const value1 = useRef();
  const value2 = useRef();
  const value3 = useRef();
  const value4 = useRef();
  const value5 = useRef();
  const value6 = useRef();
  return [value1, value2, value3, value4, value5, value6];
};

export default useInputRef;

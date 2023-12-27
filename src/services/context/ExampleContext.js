import { createContext } from "react";

//Create a new context and assign its initial values, we would usually want these empty.
//Eventually, we would want to connect the context to a custom hook that will be able 
//to provide a "global" hook under all of the context provider's children.
export const ExampleContext = createContext({
    hookValue1: "value1",
    functionExample1: () => { },
    functionExample2: () => { },
});


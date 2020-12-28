import { createContext, useState } from "react";
import { getName, getColor } from "./utils";
export const SessionContext = createContext();

const Session = ({ children }) => {
    const userID = localStorage.getItem("userID");
    const socket = JSON.parse(localStorage.getItem("socket"));

    const [session] = useState({
        id: userID,
        name: getName(userID),
        color: getColor(userID),
        socket,
    });

    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export default Session;
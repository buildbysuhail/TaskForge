import { createContext, useContext, 
    // useState
 } from "react";
 import useLocalStorage from "@/hooks/useLocalStorage";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
//   const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeam, setSelectedTeam] = useLocalStorage(
    "TF-selected-team",
    null
);

  return (
    <WorkspaceContext.Provider
      value={{ selectedTeam, setSelectedTeam }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside WorkspaceProvider"
    );
  }

  return context;
}
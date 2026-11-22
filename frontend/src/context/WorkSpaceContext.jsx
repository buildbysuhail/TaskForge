
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import { getMyTeams } from "@/services/teamApiService";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [selectedTeam, setSelectedTeam] = useLocalStorage(
    "TF-selected-team",
    null
  );

  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getMyTeams();
        const fetchedTeams = data.teams || [];

        setTeams(fetchedTeams);

        // Validate the previously selected team.
        if (
          selectedTeam &&
          !fetchedTeams.some((team) => team._id === selectedTeam)
        ) {
          setSelectedTeam(null);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, []);

  const selectedTeamData =
    teams.find((team) => team._id === selectedTeam) || null;

  return (
    <WorkspaceContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        teams,
        setTeams,
        selectedTeamData,
        loadingTeams,
      }}
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

import { useEffect, useState } from "react";
import { Users, User } from "lucide-react";

import TFSelect from "@/components/common/TFSelect";
import { getMyTeams } from "@/services/teamApiService";

function TeamSelector({ selectedTeam, onTeamChange }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getMyTeams();
        setTeams(data.teams || []);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const options = [
    {
      value: "personal",
      label: "Personal Tasks",
      icon: User,
    },
    ...teams.map((team) => ({
      value: team._id,
      label: team.name,
      icon: Users,
    })),
  ];

  return (
    <TFSelect
      label="Workspace"
      value={selectedTeam || "personal"}
      onValueChange={(value) =>
        onTeamChange(value === "personal" ? null : value)
      }
      placeholder={loading ? "Loading teams..." : "Select a workspace"}
      options={options}
      disabled={loading}
      triggerClassName="min-w-52"
    />
  );
}

export default TeamSelector;
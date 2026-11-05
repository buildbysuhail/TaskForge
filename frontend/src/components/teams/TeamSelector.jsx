import { useEffect, useState } from "react";
import { Users, User } from "lucide-react";

import TFSelect from "@/components/common/TFSelect";
import { getMyTeams } from "@/services/teamApiService";
import { showToast } from "@/lib/utils/toast";

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

  const handleTeamChange = (value) => {
    const newTeam = value === "personal" ? null : value;

    // Prevent duplicate notifications
    if (newTeam === selectedTeam) return;

    const teamName = teams.find(
      (team) => team._id === newTeam
    )?.name;

    onTeamChange(newTeam);

    showToast.success(
      newTeam
        ? `Switched to ${teamName || "Team"} workspace`
        : "Switched to Personal Workspace"
    );
  };

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
      onValueChange={handleTeamChange}
      placeholder={loading ? "Loading teams..." : "Select a workspace"}
      options={options}
      disabled={loading}
      triggerClassName="min-w-52"
    />
  );
}

export default TeamSelector;
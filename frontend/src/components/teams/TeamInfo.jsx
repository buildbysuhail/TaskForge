
import { useEffect, useState } from "react";
import { Users, CalendarDays, ShieldCheck } from "lucide-react";

import { useWorkspace } from "@/context/WorkSpaceContext";
import {
  getMyTeams,
  getTeamMembers,
} from "@/services/teamApiService";

import TFAvatar from "@/components/common/TFAvatar";

function TeamInfo() {
  const { selectedTeam } = useWorkspace();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchTeamInfo = async () => {
      if (!selectedTeam) {
        setTeam(null);
        setMembers([]);
        setLoading(false);
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [teamData, memberData] = await Promise.all([
          getMyTeams(),
          getTeamMembers(selectedTeam),
        ]);

        if (ignore) return;

        const currentTeam = teamData.teams?.find(
          (item) => item._id === selectedTeam
        );

        if (!currentTeam) {
          setTeam(null);
          setMembers([]);
          setError("Team information could not be found.");
          return;
        }

        setTeam(currentTeam);
        setMembers(memberData?.members || []);

      } catch (err) {
        console.error("Failed to fetch team information:", err);

        if (!ignore) {
          setError(
            err.response?.data?.message ||
            "Failed to load team information."
          );
          setTeam(null);
          setMembers([]);
        }

      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchTeamInfo();

    return () => {
      ignore = true;
    };
  }, [selectedTeam]);

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "owner":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400";

      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400";

      default:
        return "bg-stone-200 text-stone-700 dark:bg-zinc-800 dark:text-gray-300";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading team information...
        </p>
      </div>
    );
  }

  // Personal workspace state
  if (!selectedTeam) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
        <Users className="h-12 w-12 text-muted-foreground" />

        <h2 className="text-lg font-semibold">
          No Team Selected
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground">
          Switch to a team workspace to view its information and members.
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (!team) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-6">

      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold">
          About this Team
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Team information, workspace details and members.
        </p>
      </div>

      {/* Team Information */}
      <section className="rounded-xl border bg-card p-4 sm:p-6 flex flex-col gap-4">

        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950 p-3">
            <Users className="h-7 w-7 text-emerald-800 dark:text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold break-words">
              {team.name}
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              {team.isActive ? "Active Workspace" : "Inactive Workspace"}
            </p>
          </div>

          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            team.isActive
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
              : "bg-stone-200 text-stone-700 dark:bg-zinc-800"
          }`}>
            {team.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="border-t pt-4 dark:border-zinc-800">
          <h4 className="text-sm font-semibold mb-2">
            Team Agenda
          </h4>

          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {team.description || "No team description has been added yet."}
          </p>
        </div>

      </section>

      {/* Team Statistics */}
      <section className="grid grid-cols-2 gap-3">

        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 dark:bg-blue-950 p-2">
            <Users className="h-5 w-5 text-blue-700 dark:text-blue-400" />
          </div>

          <div>
            <p className="text-xl font-bold">
              {members.length}
            </p>

            <p className="text-xs text-muted-foreground">
              Team Members
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
          <div className="rounded-lg bg-amber-100 dark:bg-amber-950 p-2">
            <ShieldCheck className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          </div>

          <div>
            <p className="text-base font-bold capitalize">
              {team.role}
            </p>

            <p className="text-xs text-muted-foreground">
              Your Role
            </p>
          </div>
        </div>

      </section>

      {/* Team Creation Date */}
      <section className="rounded-xl border bg-card p-4 flex items-center gap-3">
        <CalendarDays className="h-5 w-5 text-muted-foreground" />

        <div>
          <p className="text-xs text-muted-foreground">
            Team Created On
          </p>

          <p className="text-sm font-semibold">
            {formatDate(team.createdAt)}
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="rounded-xl border bg-card overflow-hidden">

        <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800">
          <div>
            <h3 className="font-semibold">
              Team Members
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              People collaborating in this workspace.
            </p>
          </div>

          <span className="text-xs font-semibold rounded-full bg-muted px-3 py-1">
            {members.length} Members
          </span>
        </div>

        <div className="divide-y dark:divide-zinc-800">

          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.user._id}
                className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors"
              >

                <TFAvatar
                //  src={} // Soon: Add user profile picture if available
                  name={member.user.name}
                  size="lg"
                  title
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {member.user.name}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {member.user.email}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    Joined {formatDate(member.joinedAt)}
                  </p>
                </div>

                <span className={`text-xs font-semibold capitalize px-3 py-1 rounded-full ${getRoleStyle(member.role)}`}>
                  {member.role}
                </span>

              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No team members found.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default TeamInfo;

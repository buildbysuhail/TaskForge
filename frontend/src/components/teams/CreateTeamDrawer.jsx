
import { useState } from "react";
import { Plus, Users, Loader2 } from "lucide-react";

import TFCommonDrawer from "@/components/common/TFCommonDrawer";
import { createTeam } from "@/services/teamApiService";
import { showToast } from "@/lib/utils/toast";

function CreateTeamDrawer({
  open,
  onOpenChange,
  onTeamCreated,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
  };

  const handleOpenChange = (value) => {
    if (!loading) {
      onOpenChange(value);

      if (!value) {
        resetForm();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      showToast.error("Please enter a team name.");
      return;
    }

    try {
      setLoading(true);

      const response = await createTeam({
        name: trimmedName,
        description: trimmedDescription,
      });

      const newTeam = response.team;

      showToast.success(
        response.message || "Team created successfully!"
      );

      resetForm();
      onOpenChange(false);

      // Notify Navbar about the newly created team.
      onTeamCreated?.(newTeam);

    } catch (error) {
      console.error("Team creation failed:", error);

      showToast.error(
        error.response?.data?.message ||
        "Failed to create team. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <TFCommonDrawer
      direction="right"
      open={open}
      onOpenChange={handleOpenChange}
      showCloseButton={false}
      contentClassName="w-full sm:max-w-md"
    >
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b dark:border-zinc-800">

          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950">
            <Users className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold">
              Create a Team
            </h2>

            <p className="text-sm text-muted-foreground">
              Set up your collaborative workspace.
            </p>
          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-5 pt-6"
        >

          {/* Team Name */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="team-name"
              className="text-sm font-semibold"
            >
              Team Name
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              id="team-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Development Team"
              maxLength={50}
              required
              disabled={loading}
              className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600 disabled:opacity-50"
            />

            <p className="text-xs text-muted-foreground text-right">
              {name.length}/50
            </p>

          </div>

          {/* Team Description */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="team-description"
              className="text-sm font-semibold"
            >
              Team Agenda / Description
            </label>

            <textarea
              id="team-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this team working on?"
              rows={5}
              maxLength={500}
              disabled={loading}
              className="w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600 disabled:opacity-50"
            />

            <p className="text-xs text-muted-foreground text-right">
              {description.length}/500
            </p>

          </div>

          {/* Information */}
          <div className="rounded-lg border bg-muted/30 p-4 flex flex-col gap-3">

            <h4 className="text-sm font-semibold">
              Before you create
                <p className="text-xs text-muted-foreground mt-0">
                    Here are a few things to keep in mind when creating a team:
                </p>
            </h4>
                
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
              <li>
                You'll automatically become the team owner.
              </li>

              <li>
                You can invite members after creating the team.
              </li>

              <li>
                Your team will have its own dedicated workspace.
              </li>
            </ul>

          </div>

          {/* Actions */}
          <div className="mt-auto pt-5 flex flex-col gap-2">

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Team...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Team
                </>
              )}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleOpenChange(false)}
              className="w-full rounded-md border py-3 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </TFCommonDrawer>
  );
}

export default CreateTeamDrawer;

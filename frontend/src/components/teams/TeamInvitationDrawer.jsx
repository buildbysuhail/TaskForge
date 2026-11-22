
import { useState } from "react";
import { Mail, Send, Loader2, Users } from "lucide-react";

import TFCommonDrawer from "@/components/common/TFCommonDrawer";
import { sendTeamInvitation } from "@/services/teamApiService";
import { showToast } from "@/lib/utils/toast";

function TeamInvitationDrawer({
  open,
  onOpenChange,
  teamId,
  teamName,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
  };

  const handleOpenChange = (value) => {
    if (loading) return;

    onOpenChange(value);

    if (!value) {
      resetForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!teamId) {
      showToast.error("Please select a team workspace first.");
      return;
    }

    if (!trimmedEmail) {
      showToast.error("Please enter an email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await sendTeamInvitation(
        teamId,
        trimmedEmail
      );

      showToast.success(
        response.message || "Invitation sent successfully!"
      );

      resetForm();
      onOpenChange(false);

    } catch (error) {
      console.error("Invitation failed:", error);

      showToast.error(
        error.response?.data?.message ||
        "Failed to send invitation. Please try again."
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
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950">
            <Users className="w-6 h-6 text-blue-800 dark:text-blue-400" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold">
              Invite Team Members
            </h2>

            <p className="text-sm text-muted-foreground">
              Add people to collaborate with your team.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-5 pt-6"
        >
          {/* Selected Team */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Inviting to
            </p>

            <p className="font-semibold text-green-900 dark:text-green-600">
              {teamName || "Selected Team"}
            </p>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="invite-email"
              className="text-sm font-semibold"
            >
              Email Address
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                required
                disabled={loading || !teamId}
                className="w-full rounded-md border bg-background pl-10 pr-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Enter the email address of the person you want to invite.
            </p>
          </div>

          {/* Information */}
          <div className="rounded-lg border bg-muted/30 p-4 flex flex-col gap-2">
            <p className="text-sm font-semibold">
              Invitation details
            </p>

            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
              <li>
                The invitation will be sent to the provided email address.
              </li>
              <li>
                The recipient must accept the invitation to join the team.
              </li>
              <li>
                Team permissions are managed by the backend.
              </li>
            </ul>
          </div>

          {!teamId && (
            <p className="text-sm text-red-500">
              Select a team workspace before sending an invitation.
            </p>
          )}

          {/* Actions */}
          <div className="mt-auto pt-5 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading || !teamId || !email.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Invitation
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

export default TeamInvitationDrawer;

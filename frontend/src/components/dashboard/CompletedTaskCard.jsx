import useSoundEffects from "@/hooks/useSoundEffects";

function CompletedTaskCard({ task }) {
  const {
    title,
    description,
    priority,
    type,
  } = task;

  const { playHoverCompleted } = useSoundEffects();

  return (
    <div
        onMouseEnter={playHoverCompleted}
      className="
        group
        relative
        rounded-xl
        border
        border-base-300
        bg-[#F2E7DF]/30
        dark:bg-zinc-700/70
        p-3
        sm:p-5
        shadow-md
        transition-all
        duration-300
        ease-out
        transform-gpu
        hover:-translate-y-2
        hover:rotate-[1deg]
        hover:scale-[1.02]
        hover:shadow-2xl
      "
    //   style={}
    >
      {/* Completed indicator */}
      <div
        className="
          right-2
          top-2
          flex
          h-6
          w-6
          sm:right-4
          sm:top-4
          sm:h-8
          sm:w-8
          items-center
          justify-center
          rounded-full
          bg-success/15
          text-success
          text-xs
          sm:text-base
        "
      >
        ✓
      </div>

      {/* Task title */}
      <h3
        className="
          pr-8
          sm:pr-10
          text-sm
          sm:text-lg
          break-words
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mt-2
          line-clamp-3
          min-h-[3rem]
          sm:min-h-[6.5rem]
          break-words
          text-xs
          sm:text-sm
        "
      >
        {description || 
        <span className="text-slate-400">
        No description provided.
        </span>
        }
      </p>

      {/* Priority + Type */}
      <div className="mt-2 sm:mt-4 flex justify-between px-0 sm:px-3 py-1 sm:py-2 gap-2 sm:gap-5">
        <div className="flex flex-col items-start min-w-0">
            <p className="font-light text-xs sm:text-base text-stone-600 dark:text-gray-300">Priority</p>
        {priority && (
          <span className="badge badge-outline">
            {priority}
          </span>
        )}
        </div>

        <div className="flex-flex-col">
            <p className="font-light text-stone-600 dark:text-gray-300">Type</p>
        {type && (
          <span className="badge badge-outline">
            {type}
          </span>
        )}
        </div>
      </div>

      {/* Subtle completed glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          rounded-2xl
          bg-success/10
          opacity-0
          blur-xl
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />
    </div>
  );
}

export default CompletedTaskCard;


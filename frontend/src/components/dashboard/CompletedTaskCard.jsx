function CompletedTaskCard({ task }) {
  const {
    title,
    description,
    priority,
    type,
  } = task;

  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-base-300
        bg-base-100
        p-5
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
    >
      {/* Completed indicator */}
      <div
        className="
          absolute
          right-4
          top-4
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-success/15
          text-success
        "
      >
        ✓
      </div>

      {/* Task title */}
      <h3
        className="
          pr-10
          text-lg
          font-semibold
          text-base-content
          transition-colors
          duration-300
          group-hover:text-success
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mt-2
          line-clamp-3
          min-h-[4.5rem]
          text-sm
          text-base-content/60
        "
      >
        {description || "No description provided."}
      </p>

      {/* Priority + Type */}
      <div className="mt-4 flex flex-wrap gap-2">
        {priority && (
          <span className="badge badge-outline">
            {priority}
          </span>
        )}

        {type && (
          <span className="badge badge-outline">
            {type}
          </span>
        )}
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


import CompletedTaskCard from "./CompletedTaskCard";

function CompletedTasks({ tasks = [] }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <section className="w-0 min-w-full">
      {/* Section heading */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-base-content">
          Completed Tasks
        </h2>

        <p className="mt-1 text-sm text-base-content/60">
          Your accomplishments so far
        </p>
      </div>

      {/* Empty state */}
      {completedTasks.length === 0 ? (
        <div
          className="
            flex
            min-h-40
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-base-300
            bg-base-200/30
            px-4
            sm:px-6
            text-center
          "
        >
          <div>
            <div className="mb-2 text-3xl">🎯</div>

            <p className="font-medium text-base-content">
              No completed tasks yet
            </p>

            <p className="mt-1 text-sm text-base-content/60">
              Complete a task and your achievement will appear here.
            </p>
          </div>
        </div>
      ) : (
          <div
              className="
                grid
                grid-cols-1
                gap-1
                sm:grid-cols-2
                sm:gap-4
                md:grid-cols-3
                lg:gap-5
                xl:grid-cols-4
                items-start
                [&>*]:min-w-0
              "
          >
            {completedTasks.map((task) => (
              <CompletedTaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CompletedTasks;


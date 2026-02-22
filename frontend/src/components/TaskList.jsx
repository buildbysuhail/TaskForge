// import React from 'react'

function TaskList({tasks}) {
  // console.log(tasks, "tsskskdsak")
  return (
    <div>
      <ul>
      {tasks.map((task, index)=> (
        <li key={index}>{task.title ?? task}</li>
      ))}
      </ul>
    </div>
  )
}

export default TaskList

import React from "react";
import PropTypes from "prop-types";
import Task from "../Task";
import LoadingRow from "../LoadingRow";

/**
 * TaskList
 * @param loading
 * @param tasks
 * @param onPinTask
 * @param onArchiveTask
 * @constructor
 */
export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  // 아직 로딩 중일 때에 보여줄 모습입니다.
  if (loading) return (
    <div className="list-items">
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
    </div>
  );

  // 아직 등록된 Task 가 없을때 보여줄 모습입니다.
  if (tasks.length === 0) return (
    <div className="list-items">
      <div className="wrapper-message">
        <span className="icon-check" />
        <p className="title-message">You Have no tasks</p>
        <p className="submit-message">Sit back and just relax.</p>
      </div>
    </div>
  );

  /**
   * 핀이 고정된 Task 들을 상단에 오도록 순서를 조정한 결과입니다.
   * @type {*[]}
   */
  const tasksInOrder = [
    ...tasks.filter((task) => task.state === 'TASK_PINNED'),
    ...tasks.filter((task) => task.state !== 'TASK_PINNED'),
  ];

  // 컴포넌트 구조입니다.
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={onPinTask}
          onArchiveTask={onArchiveTask}
        />
      ))}
    </div>
  );
}
TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func
};
TaskList.defaultProps = {
  loading: false
};

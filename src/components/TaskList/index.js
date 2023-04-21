import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Task from "../Task";
import LoadingRow from "../LoadingRow";
import {updateTaskState} from "../../lib/redux/store";

/**
 * TaskList
 * @constructor
 */
export default function TaskList() {

  /**
   * 핀이 고정된 Task 들을 상단에 오도록 순서를 조정한 결과입니다.
   * @type {*[]}
   */
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((task) => task.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((task) => task.state !== 'TASK_PINNED'),
    ];
    return tasksInOrder.filter(
      (task) => ['TASK_PINNED', 'TASK_INBOX'].includes(task.state)
    );
  });

  /**
   * 현재 Task 목록 상태 참조입니다.
   */
  const { status } = useSelector((state) => state.taskbox);

  /**
   * Redux Dispatch 를 사용합니다.
   */
  const dispatch = useDispatch();

  /**
   * Task 를 PIN 상태로 변경합니다.
   * @param value
   */
  const pinTask = (value) => {
    dispatch(updateTaskState({
      id: value,
      newTaskState: 'TASK_PINNED'
    }));
  };

  /**
   * Task 를 ARCHIVE 상태로 변경합니다.
   * @param value
   */
  const archiveTask = (value) => {
    dispatch(updateTaskState({
      id: value,
      newTaskState: 'TASK_ARCHIVED'
    }))
  };

  // 아직 로딩 중일 때에 보여줄 모습입니다.
  if (status === 'loading') return (
    <div className="list-items" data-testid="loading" key="loading">
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
    <div className="list-items" data-testid="empty" key="empty">
      <div className="wrapper-message">
        <span className="icon-check" />
        <p className="title-message">You Have no tasks</p>
        <p className="submit-message">Sit back and just relax.</p>
      </div>
    </div>
  );

  // 컴포넌트 구조입니다.
  return (
    <div className="list-items" data-testid="success" key="success">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
}

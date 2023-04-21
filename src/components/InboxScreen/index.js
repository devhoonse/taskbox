import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../lib/redux/store";
import TaskList from "../TaskList";

export default function InboxScreen() {
  /**
   * Redux 이벤트 디스패치를 사용합니다.
   * @type {Dispatch}
   */
  const dispatch = useDispatch();
  /**
   * Redux 비동기 이벤트 처리 중 발생하는 에러에 대한 참조입니다.
   */
  const { error } = useSelector((state) => state.taskbox);
  /*
    컴포넌트가 처음 마운트될 때 실행합니다.
   */
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  /*
    Redux 비동기 이벤트 처리 중 에러가 발생한 경우의 컴포넌트 모습입니다.
   */
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">
            Something went wrong!
          </p>
        </div>
      </div>
    );
  }
  /*

   */
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList/>
    </div>
  );
}


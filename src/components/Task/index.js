/*
* import : 3rd-parties
* */
import React from 'react';
import PropTypes from "prop-types";

/*
* import : user-defined modules
* */

/**
 * Task
 * @param id
 * @param title
 * @param state
 * @param onArchiveTask
 * @param onPinTask
 * @return {JSX.Element}
 * @constructor
 */
const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {

  /*
  * 컴포넌트 구조 정의입니다.
  * */
  return (
    <div className={['list-item', state].join(' ')}>
      <label
        htmlFor="checked"
        className="checkbox"
        aria-label={`archiveTask-${id}`}
      >
        <input
          disabled
          type="checkbox"
          className="checkbox"
          id={`archiveTask-${id}`}
          name="checked"
          checked={state === "TASK_ARCHIVED"}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
        />
      </label>
      <label
        htmlFor="title"
        className="title"
        aria-label={title}
      >
        <input
          readOnly
          type="text"
          id={id}
          name="title"
          value={`${title}`}
          style={{ textOverflow: 'ellipsis' }}
        />
      </label>
      {state !== "TASK_ARCHIVED" && (
        <button
          id={`pinTask-${id}`}
          key={`pinTask-${id}`}
          className={['pin-button'].join(' ')}
          aria-label={`pinTask-${id}`}
          onClick={() => onPinTask(id)}
        >
          <span className="icon-star" />
        </button>
      )}
    </div>
  );
};
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func
};

/*
* 컴포넌트 정의를 밖에서 가져다 사용할 수 있도록 내보냅니다.
* */
export default Task;

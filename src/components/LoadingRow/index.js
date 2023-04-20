/**
 * 로딩 중 상태 표시 컴포넌트
 * @constructor
 */
export default function LoadingRow() {
  return (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span>
        <span>Cool</span>
        <span>State</span>
      </span>
    </div>
  );
}

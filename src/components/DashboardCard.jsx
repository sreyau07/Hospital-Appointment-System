function DashboardCard({ title, value, color }) {
  return (
    <div
      className="card shadow-lg border-0 h-100"
      style={{
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <div
        className="card-body text-center"
        style={{
          background: color,
          color: "white",
          padding: "30px",
        }}
      >
        <h5 className="fw-bold">
  {title === "Doctors" && "👨‍⚕️ "}
  {title === "Patients" && "🧑‍🤝‍🧑 "}
  {title === "Appointments" && "📅 "}
  {title}
</h5>
        <h1
          className="display-4 fw-bold"
          style={{
            marginTop: "15px",
          }}
        >
          {value}
        </h1>
      </div>
    </div>
  );
}

export default DashboardCard;
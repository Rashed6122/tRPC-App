function CreatedAt({ createdAt }: { createdAt: string | undefined }) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Invalid date";
  return (
    <p className="text-sm text-gray-600 mb-2">
      Created At:{" "}
      <span className="text-gray-700 font-medium">{formattedDate}</span>
    </p>
  );
}

export default CreatedAt;

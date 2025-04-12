import { useNavigate } from "react-router-dom";

const ReportTable = ({ reports }) => {
  const navigate = useNavigate();

  if (!reports || reports.length === 0) {
    return (
      <p className="mt-8 text-center text-gray-600 dark:text-gray-300">
        No reports found.
      </p>
    );
  }

  return (
    <div className="mt-12 overflow-x-auto">
      <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-white">
        User Reports
      </h2>
      <table className="min-w-full table-auto overflow-hidden rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="border p-3 text-gray-800 dark:text-white">
              Username
            </th>
            <th className="border p-3 text-gray-800 dark:text-white">
              Post Title
            </th>
            <th className="border p-3 text-gray-800 dark:text-white">
              Comment Text
            </th>
            <th className="border p-3 text-gray-800 dark:text-white">Reason</th>
            <th className="border p-3 text-gray-800 dark:text-white">Date</th>
            <th className="border p-3 text-gray-800 dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody className="dark:bg-gray-900">
          {reports.map((report) => (
            <tr
              key={report._id}
              className="text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="border p-3 text-gray-800 dark:text-white">
                {report.username}
              </td>
              <td className="border p-3 text-gray-800 dark:text-white">
                {report.postTitle}
              </td>
              <td className="border p-3 text-gray-800 dark:text-white">
                {report.commentText || "-"}
              </td>
              <td className="border p-3 text-gray-800 dark:text-white">
                {report.report}
              </td>
              <td className="border p-3 text-gray-800 dark:text-white">
                {new Date(report.date).toLocaleString()}
              </td>
              <td className="border p-3 text-center text-gray-800 dark:text-white">
                <button
                  onClick={() => navigate(`/forum/post/${report.postId}`)}
                  className="cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-xs text-white hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;

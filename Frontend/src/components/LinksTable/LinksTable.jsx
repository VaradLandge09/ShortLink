import {
  BarChart3,
  Copy,
  ExternalLink,
  Eye,
  Edit2,
  Trash2,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

function LinksTable({ links = [], deleteUrl, updateStatus, onEdit, redirect }) {
  const [currentPage, setCurrenctPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = currentPage * itemsPerPage;

  const currentItems = links.slice(startIndex, lastIndex);

  const totalPages = Math.ceil(links.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const copyToClipboard = (short) => {
    window.navigator.clipboard.writeText(short);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((link) => (
                <tr key={link.url_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {link.custom_alias
                            ? link.custom_alias
                            : link.short_code}
                        </p>
                        <button
                          data-tooltip-id="copy-tooltip"
                          data-tooltip-content="Copy!"
                          onClick={() => copyToClipboard(link.short_code)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <Tooltip
                          id="copy-tooltip"
                          noArrow
                          className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                        />

                        <button
                          data-tooltip-id="external-tooltip"
                          data-tooltip-content={"Redirect"}
                          onClick={() => redirect(link)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <Tooltip
                          noArrow
                          id="external-tooltip"
                          className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                        />
                      </div>
                      <p
                        className="text-sm text-gray-500 truncate"
                        title={link.original_url}
                      >
                        {link.original_url}
                      </p>
                      {link.custom_alias && (
                        <p className="text-xs text-gray-400 mt-1">
                          Alias: {link.custom_alias}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        {link.click_count.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">clicks</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {link.status && (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          link.status
                        )}`}
                      >
                        {link.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(link.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {link.status === "active" && (
                        <div>
                          <button
                            data-tooltip-id="pause-tooltip"
                            data-tooltip-content={"Deactivate"}
                            onClick={() => updateStatus(link.url_id)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Pause className="h-4 w-4" />
                          </button>
                          <Tooltip
                            noArrow
                            id="pause-tooltip"
                            className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                          />
                        </div>
                      )}
                      {link.status === "in-active" && (
                        <div>
                          <button
                            data-tooltip-id="play-tooltip"
                            data-tooltip-content={"Activate"}
                            onClick={() => updateStatus(link.url_id)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <Tooltip
                            noArrow
                            id="play-tooltip"
                            className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                          />
                        </div>
                      )}
                      <div>
                        <button
                          data-tooltip-id="barchart-tooltip"
                          data-tooltip-content={"Open analysis"}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </button>
                        <Tooltip
                          noArrow
                          id="barchart-tooltip"
                          className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                        />
                      </div>

                      <div>
                        <button
                          data-tooltip-id="edit-tooltip"
                          data-tooltip-content={"Edit"}
                          onClick={() => onEdit(link)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <Tooltip
                          noArrow
                          id="edit-tooltip"
                          className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                        />
                      </div>
                      <div>
                        <button
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content={"Delete"}
                          onClick={() => deleteUrl(link.url_id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Tooltip
                          noArrow
                          id="delete-tooltip"
                          className="!bg-gray-600 !text-white !rounded-lg !px-2 !py-0"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {/* Showing 5 to {links.length} of {links.length} results */}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 text-sm text-gray-500 hover:text-blue-600 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrenctPage(currentPage - 1)}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-sm rounded ${
                    index + 1 === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                  onClick={() => setCurrenctPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 text-sm text-gray-500 hover:text-blue-600 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrenctPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LinksTable;

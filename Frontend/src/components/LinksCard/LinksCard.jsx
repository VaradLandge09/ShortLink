import {
  Copy,
  ExternalLink,
  Eye,
  Calendar,
  Edit2,
  Trash2,
  Pause,
  SatelliteIcon,
  Play,
  BarChart3,
} from "lucide-react";
import { Tooltip } from "react-tooltip";

function LinksCard({ links = [], deleteUrl, updateStatus, redirect, onEdit }) {
  const copyToClipboard = (short) => {
    window.navigator.clipboard.writeText(short);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {links.map((link) => (
        <div
          key={link?.url_id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-sm font-medium text-blue-600 truncate">
                  {link?.custom_alias ? link?.custom_alias : link?.short_code}
                </h3>
                <div>
                  <button
                    data-tooltip-id="copy-tooltip"
                    data-tooltip-content={"Copy"}
                    onClick={() => copyToClipboard(link?.short_code)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <Tooltip
                    id="copy-tooltip"
                    noArrow
                    className="!py-0 !px-2 !bg-gray-700 !text-white !rounded-lg"
                  />
                </div>
                <div>
                  <button
                    data-tooltip-id="link-tooltip"
                    data-tooltip-content={"Redirect"}
                    onClick={(e) => redirect(link)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <Tooltip
                    id="link-tooltip"
                    noArrow
                    className="!py-0 !px-2 !bg-gray-700 !text-white !rounded-lg"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate mb-2">
                {link?.original_url}
              </p>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {link?.click_count} clicks
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(link?.created_at)}
                </span>
                <span className="flex items-center">
                  <SatelliteIcon className="h-3 w-3 mr-1" />
                  {link?.status}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <div>
                <button
                  data-tooltip-id="status-tooltip"
                  data-tooltip-content={
                    link?.status === "active" ? "Deactivate" : "Activate"
                  }
                  onClick={() => updateStatus(link?.url_id)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  {link?.status === "active" && <Pause className="h-4 w-4" />}
                  {link?.status === "in-active" && <Play className="h-4 w-4" />}
                </button>
                <Tooltip
                  id="status-tooltip"
                  noArrow
                  className="!py-0 !px-2 !bg-gray-700 !text-white !rounded-lg"
                />
              </div>
              <div>
                <button
                  data-tooltip-id="analysis-tooltip"
                  data-tooltip-content={"Open analysis"}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
                <Tooltip
                  id="analysis-tooltip"
                  noArrow
                  className="!py-0 !px-2 !bg-gray-700 !text-white !rounded-lg"
                />
              </div>
              <div>
                <button
                  data-tooltip-id="edit-tooltip"
                  data-tooltip-content={"Edit"}
                  onClick={() => onEdit(link)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <Tooltip
                  id="edit-tooltip"
                  noArrow
                  className="!py-0 !px-2 !bg-gray-700 !text-white !rounded-lg"
                />
              </div>
              <div>
                <button
                  data-tooltip-id="delete-tooltip"
                  data-tooltip-content={"Delete"}
                  onClick={() => deleteUrl(link?.url_id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Tooltip
                  id="delete-tooltip"
                  noArrow
                  className="!py-0 !px-2 !bg-gray-700 !text-white !rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default LinksCard;

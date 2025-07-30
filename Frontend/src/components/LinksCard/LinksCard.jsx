import React from "react";
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
} from "lucide-react";

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
                <button
                  onClick={() => copyToClipboard(link?.short_code)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => redirect(link)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
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
              {link?.status === "active" && (
                <button
                  onClick={() => updateStatus(link?.url_id)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Pause className="h-4 w-4" />
                </button>
              )}
              {link?.status === "in-active" && (
                <button
                  onClick={() => updateStatus(link?.url_id)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Play className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => onEdit(link)} className="text-gray-400 hover:text-blue-600">
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteUrl(link?.url_id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default LinksCard;

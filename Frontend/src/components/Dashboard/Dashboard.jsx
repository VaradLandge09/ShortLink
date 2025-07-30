import { useState, useEffect } from "react";
import { Link, Plus, Globe, MousePointer, X } from "lucide-react";
import axios from "axios";
import { host } from "../../globalVar";
import { useNavigate } from "react-router-dom";
import LinksCard from "../LinksCard/LinksCard";
import {
  changeLinkStatus,
  createNewUrl,
  deleteUrlUsingId,
  editUrl,
} from "../../services/UrlServices";

export default function Dashboard() {
  const [newUrl, setNewUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");

  const [editLink, setEditLink] = useState("");
  const [editAlias, setEditAlias] = useState("");

  const [links, setLinks] = useState([]);
  const [user, setUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editLinkData, setEditLinkData] = useState(null);

  const navigate = useNavigate();

  const getDashboardData = async () => {
    try {
      if (user) {
        console.log("in dashboard");
        const response = await axios.get(`${host}/all-links-data`, {
          headers: {
            user_id: user.id,
          },
        });

        console.log(response.data.links);
        const newLinks = response.data.links;
        setLinks(newLinks);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      if (newUrl) {
        const response = await createNewUrl(newUrl, customAlias);
        console.log(response);
        const link = response;
        setLinks((prev) => [...prev, link]);
        setNewUrl("");
        setCustomAlias("");
      } else {
        console.error("Please enter a URL");
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const deleteUrl = async (id) => {
    try {
      if (id && user && user.id) {
        const res = deleteUrlUsingId(id);

        setLinks((prev) => prev.filter((val) => val.url_id !== id));
        console.log(links);
      }
    } catch (error) {}
  };

  const updatingStatus = (id) => {
    changeLinkStatus(id);
    setLinks((prev) =>
      prev.map((link) =>
        link.url_id === id
          ? {
              ...link,
              status: link.status === "active" ? "in-active" : "active",
            }
          : link
      )
    );
  };

  const redirectToLink = (link) => {
    if (link.status === "active") {
      window.open(`http://localhost:8000/${link.short_code}`, "_blank");
      setLinks((prev) =>
        prev.map((url) =>
          url.url_id === link.url_id
            ? { ...url, click_count: url.click_count + 1 }
            : url
        )
      );
    }
  };

  const handleEdit = (linkToEdit) => {
    if (linkToEdit) {
      setEditLinkData(linkToEdit);
      setShowCreateForm(true);
      setEditLink(linkToEdit.original_url);
      setEditAlias(linkToEdit.custom_alias);
    }
  };

  const submitEditedLink = async () => {
    if (!editLink) {
      console.error("Please enter the url");
      setShowCreateForm(false);
    } else {
      const response = await editUrl({
        id: editLinkData.url_id,
        newUrl: editLink,
        customAlias: editAlias,
      });

      setShowCreateForm(false);
      console.log(response);

      setLinks((prev) =>
        prev.map((link) =>
          link.url_id === editLinkData.url_id
            ? {
                ...link,
                original_url: newUrl,
                custom_alias: customAlias ? customAlias : link.custom_alias,
              }
            : link
        )
      );

      setEditLink("")
      setEditAlias("")
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    console.log(links);
  }, [links]);

  useEffect(() => {
    getDashboardData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage and track your shortened links
          </p>
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-white/50 backdrop:blur-2xl flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full border-gray-200 border-2">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Link
                  </h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original URL *
                    </label>
                    <input
                      type="url"
                      value={editLink}
                      onChange={(e) => setEditLink(e.target.value)}
                      placeholder="https://example.com/your-long-url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Alias (Optional)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                        short.ly/
                      </span>
                      <input
                        type="text"
                        value={editAlias}
                        onChange={(e) => setEditAlias(e.target.value)}
                        placeholder="my-custom-link"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Leave empty for auto-generated alias
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!editLink}
                    onClick={submitEditedLink}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Edit Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                <Link className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Links</p>
                <p className="text-2xl font-bold text-gray-900">
                  {links.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                <MousePointer className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Clicks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {links
                    .reduce((sum, link) => sum + link?.click_count, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-50 text-orange-600 mr-4">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Links
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {links.filter((link) => link?.status === "active").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Link */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Plus className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Create New Link
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original URL
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/your-long-url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Alias (Optional)
                  </label>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    placeholder="my-custom-link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleCreateLink}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Create Short Link
                </button>
              </div>
            </div>
          </div>

          {/* Recent Links */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Links
                </h2>
              </div>

              <div className="space-y-4">
                <LinksCard
                  links={links}
                  deleteUrl={deleteUrl}
                  updateStatus={updatingStatus}
                  redirect={redirectToLink}
                  onEdit={handleEdit}
                />
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/links")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All Links
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

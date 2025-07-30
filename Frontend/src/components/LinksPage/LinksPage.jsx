import { useEffect, useState } from "react";
import {
  Link,
  BarChart3,
  User,
  Menu,
  X,
  Copy,
  ExternalLink,
  Eye,
  Calendar,
  Edit2,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  Globe,
  MousePointer,
  TrendingUp,
  Pause,
} from "lucide-react";
import axios from "axios";
import { host } from "../../globalVar";
import LinksTable from "../LinksTable/LinksTable";
import { changeLinkStatus } from "../../services/UrlServices";

export default function LinksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const [links, setLinks] = useState([]);

  const [user, setUser] = useState(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editLinkData, setEditLinkData] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");

  const getAllLinksData = async () => {
    try {
      if (user) {
        console.log("in links tab");
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

  const deleteUrl = async (id) => {
    try {
      if (id && user && user.id) {
        const response = await axios.delete(`${host}/url/${id}`, {
          headers: {
            user_id: user.id,
          },
        });

        setLinks((prev) => prev.filter((val) => val.url_id !== id));
        console.log(links);
      }
    } catch (error) {}
  };

  const handleEdit = (link) => {
    setEditLinkData(link);
    setShowCreateForm(true);
    setNewUrl(link.original_url);
    setCustomAlias(link?.custom_alias);
  };

  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (!newUrl) {
        console.error("Please enter a URL");
        setShowCreateForm(false);
      } else {
        if (editLinkData) {
          response = await axios.put(
            `${host}/update-url/${editLinkData.url_id}`,
            { newUrl, customAlias },
            {
              headers: {
                user_id: user.id,
              },
            }
          );
          const updatedLink = response.data?.link;
          setLinks((prev) =>
            prev.map((link) =>
              updatedLink.url_id === link.url_id ? updatedLink : link
            )
          );
        } else {
          response = await axios.post(
            `${host}/create-new-url`,
            { url: newUrl, alias: customAlias },
            {
              headers: {
                user_id: user.id,
              },
            }
          );
          const link = response.data?.link;
          setLinks((prev) => [...prev, link]);
        }
        console.log(response.data?.link);
        setNewUrl("");
        setCustomAlias("");
        setShowCreateForm(false);
      }
    } catch (error) {}
  };

  const updateStatus = (id) => {
    changeLinkStatus(id);
    setLinks((prev) =>
      prev.map((link) =>
        link.url_id === id
          ? { ...link, status: link.status === "active" ? "in-active" : "active" }
          : link
      )
    );
  };

  const redirectToLink = (link) => {
    if (link.status === "active") {
      window.open(`http://localhost:8000/${link.short_code}`, "_blank");
      setLinks((prev) => prev.map((url) => url.url_id===link.url_id ? {...url, click_count: url.click_count + 1} : url))
    }
  };
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    getAllLinksData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Links</h1>
              <p className="mt-2 text-gray-600">
                Manage and track all your shortened links
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Link
              </button>
            </div>
          </div>
        </div>

        {/* Create Link Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-white/50 backdrop:blur-2xl flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full border-gray-200 border-2">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editLinkData ? "Edit Link" : "Create New Link"}
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
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
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
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
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
                    onClick={handleCreateLink}
                    disabled={!newUrl}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Create Link
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
                    .reduce((sum, link) => sum + link.click_count, 0)
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
                  {links.filter((link) => link.status === "active").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Links</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            <button className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 border border-gray-300 rounded-md transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Links Table */}
        <LinksTable
          links={links}
          deleteUrl={deleteUrl}
          updateStatus={updateStatus}
          onEdit={handleEdit}
          redirect={redirectToLink}
        />
      </div>
    </div>
  );
}

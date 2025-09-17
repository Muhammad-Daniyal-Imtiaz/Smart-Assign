'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, User, Mail, Phone, MapPin, FileText, Download,
  Eye, EyeOff, LogOut, ChevronLeft, ChevronRight, Search,
  Calendar, Shield, AlertCircle, X, ExternalLink
} from 'lucide-react';

// Type definition for application data
interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  phone_number_2?: string;
  current_residence: string;
  cv_url?: string;
  cv_live_preview_url?: string;
  cover_letter_text?: string;
  cover_letter_url?: string;
  cover_letter_live_preview_url?: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const applicationsPerPage = 8;

  // Filter applications based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone_number.includes(searchTerm) ||
        app.current_residence.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, applications]);

  // Get current applications for pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok) {
        const token = btoa(`admin:${password}`);
        setAuthToken(token);
        setIsAuthenticated(true);
        fetchApplications(token);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async (token: string) => {
    try {
      const response = await fetch('/api/applic', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setApplications([]);
    setSearchTerm('');
    setAuthToken('');
  };

  const viewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Secure access to job applications</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter admin password"
                />
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Job Applications Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              name: "Total Applications",
              value: applications.length,
              icon: <User className="h-6 w-6 text-indigo-600" />,
              bgColor: "bg-indigo-50",
              textColor: "text-indigo-600"
            },
            {
              name: "With Cover Letters",
              value: applications.filter(app => app.cover_letter_text || app.cover_letter_url).length,
              icon: <FileText className="h-6 w-6 text-green-600" />,
              bgColor: "bg-green-50",
              textColor: "text-green-600"
            },
            {
              name: "This Month",
              value: applications.filter(app => {
                const appDate = new Date(app.created_at);
                const now = new Date();
                return appDate.getMonth() === now.getMonth() &&
                       appDate.getFullYear() === now.getFullYear();
              }).length,
              icon: <Calendar className="h-6 w-6 text-purple-600" />,
              bgColor: "bg-purple-50",
              textColor: "text-purple-600"
            },
            {
              name: "CVs Available",
              value: applications.filter(app => app.cv_url).length,
              icon: <Download className="h-6 w-6 text-amber-600" />,
              bgColor: "bg-amber-50",
              textColor: "text-amber-600"
            }
          ].map((stat, index) => (
            <div key={index} className={`rounded-xl ${stat.bgColor} p-5 shadow-sm`}>
              <div className="flex items-center space-x-4">
                <div className={`rounded-full p-3 ${stat.bgColor} ${stat.textColor}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="relative max-w-md mb-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredApplications.length}</span> of <span className="font-medium text-gray-900">{applications.length}</span> applications
              </p>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Applicant', 'Contact', 'Location', 'Date Applied', 'Actions'].map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentApplications.length > 0 ? (
                  currentApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{application.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{application.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.phone_number}</div>
                        {application.phone_number_2 && (
                          <div className="text-sm text-gray-500">{application.phone_number_2}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{application.current_residence}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(application.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => viewApplicationDetails(application)}
                            className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
                          >
                            View Details
                          </button>
                          {application.cv_live_preview_url && (
                            <button
                              onClick={() => window.open(application.cv_live_preview_url, '_blank', 'noopener,noreferrer')}
                              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              <span>CV</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-sm font-medium text-gray-500">No applications found</p>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
              <div className="text-sm text-gray-700 mb-3 sm:mb-0">
                Showing <span className="font-medium">{indexOfFirstApplication + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastApplication, filteredApplications.length)}
                </span> of{' '}
                <span className="font-medium">{filteredApplications.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Corrected Application Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApplication && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            />

            {/* Modal Container */}
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with gradient */}
                <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600" />

                {/* Content area */}
                <div className="p-6">
                  {/* Close button */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Main content */}
                  <div className="space-y-6">
                    {/* Applicant header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedApplication.name}</h3>
                        <p className="text-sm text-gray-500">{selectedApplication.email}</p>
                      </div>
                    </div>

                    {/* Content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Personal Info Section */}
                      <div className="bg-gray-50 rounded-lg p-5 space-y-4">
                        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                          <User className="h-5 w-5 text-indigo-600 mr-2" />
                          Personal Information
                        </h4>
                        <div className="space-y-3">
                          {[
                            { label: "Email", value: selectedApplication.email },
                            { label: "Primary Phone", value: selectedApplication.phone_number },
                            ...(selectedApplication.phone_number_2 ? [{
                              label: "Secondary Phone",
                              value: selectedApplication.phone_number_2
                            }] : []),
                            {
                              label: "Location",
                              value: (
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                  {selectedApplication.current_residence}
                                </span>
                              )
                            },
                            {
                              label: "Application Date",
                              value: new Date(selectedApplication.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            },
                            { label: "Application ID", value: selectedApplication.id }
                          ].map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                {item.label}
                              </p>
                              <div className="text-sm text-gray-900">
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Documents Section */}
                      <div className="bg-gray-50 rounded-lg p-5 space-y-4">
                        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                          <FileText className="h-5 w-5 text-green-600 mr-2" />
                          Application Documents
                        </h4>
                        <div className="space-y-3">
                          {selectedApplication.cv_live_preview_url && (
                            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-6 w-6 text-indigo-500" />
                                  <div>
                                    <p className="font-medium text-gray-900">Curriculum Vitae</p>
                                    <p className="text-xs text-gray-500">PDF Document</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => window.open(selectedApplication.cv_live_preview_url!, '_blank')}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View CV
                                </button>
                              </div>
                            </div>
                          )}

                          {selectedApplication.cover_letter_live_preview_url && (
                            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-6 w-6 text-green-500" />
                                  <div>
                                    <p className="font-medium text-gray-900">Cover Letter</p>
                                    <p className="text-xs text-gray-500">PDF Document</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => window.open(selectedApplication.cover_letter_live_preview_url!, '_blank')}
                                  className="flex items-center px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter Content */}
                    {selectedApplication.cover_letter_text && (
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                          <FileText className="h-5 w-5 text-green-600 mr-2" />
                          Cover Letter Content
                        </h4>
                        <div className="prose prose-sm max-w-none p-5 bg-white rounded-lg border border-gray-200">
                          <p className="whitespace-pre-wrap text-gray-800">
                            {selectedApplication.cover_letter_text}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

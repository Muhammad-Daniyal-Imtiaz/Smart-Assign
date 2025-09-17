// app/components/job/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, FileText, Download,
  CheckCircle, XCircle, Filter, Search, Calendar,
  Eye, ChevronLeft, ChevronRight
} from 'lucide-react';

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  phone_number_2: string | null;
  current_residence: string;
  cv_url: string | null;
  cv_live_preview_url: string | null;
  cover_letter_text: string | null;
  cover_letter_url: string | null;
  cover_letter_live_preview_url: string | null;
  created_at: string;
  status: 'new' | 'reviewed' | 'contacted' | 'hired' | 'rejected';
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function JobApplicationsAdmin() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        return;
      }

      setApplications(applications.map(app => 
        app.id === id ? { ...app, status } : app
      ));

      if (selectedApplication?.id === id) {
        setSelectedApplication({ ...selectedApplication, status });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);
  const currentApplications = filteredApplications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-purple-100 text-purple-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
          <p className="text-gray-600">Manage and review all job applications</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.email}</div>
                      <div className="text-sm text-gray-500">{application.phone_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.current_residence}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <select
                        value={application.status}
                        onChange={(e) => updateApplicationStatus(application.id, e.target.value as JobApplication['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 text-sm text-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-1 text-sm text-gray-700 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application Details
                  </h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Name</span>
                        <p className="text-gray-900">{selectedApplication.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Email</span>
                        <p className="text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Phone</span>
                        <p className="text-gray-900">{selectedApplication.phone_number}</p>
                      </div>
                      {selectedApplication.phone_number_2 && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Secondary Phone</span>
                          <p className="text-gray-900">{selectedApplication.phone_number_2}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">Location</span>
                        <p className="text-gray-900">{selectedApplication.current_residence}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Application Documents
                    </h3>
                    <div className="space-y-3">
                      {selectedApplication.cv_url && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">CV</span>
                          <div className="flex items-center mt-1">
                            <a
                              href={selectedApplication.cv_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download CV
                            </a>
                            {selectedApplication.cv_live_preview_url && (
                              <a
                                href={selectedApplication.cv_live_preview_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-green-600 hover:text-green-800 flex items-center"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      {selectedApplication.cover_letter_url && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Cover Letter</span>
                          <div className="flex items-center mt-1">
                            <a
                              href={selectedApplication.cover_letter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download Cover Letter
                            </a>
                            {selectedApplication.cover_letter_live_preview_url && (
                              <a
                                href={selectedApplication.cover_letter_live_preview_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-green-600 hover:text-green-800 flex items-center"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      {selectedApplication.cover_letter_text && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Cover Letter Text</span>
                          <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                            {selectedApplication.cover_letter_text}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <select
                      value={selectedApplication.status}
                      onChange={(e) => updateApplicationStatus(selectedApplication.id, e.target.value as JobApplication['status'])}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="contacted">Contacted</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
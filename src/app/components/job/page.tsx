'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, Variants } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, FileText, Upload,
  CheckCircle, AlertCircle, Loader2, Briefcase, ExternalLink
} from 'lucide-react';

// Type definitions
interface JobApplicationFormData {
  name: string;
  email: string;
  phone_number: string;
  phone_number_2: string;
  current_residence: string;
  cv: File | null;
  cover_letter_text: string;
  cover_letter_file: File | null;
}

interface JobApplicationSubmitData {
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
}

interface ApplicationResponse {
  message?: string;
  data?: any;
  error?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Background image URL
const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80";

export default function JobApplicationForm() {
  const [formData, setFormData] = useState<JobApplicationFormData>({
    name: '',
    email: '',
    phone_number: '',
    phone_number_2: '',
    current_residence: '',
    cv: null,
    cover_letter_text: '',
    cover_letter_file: null
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [currentUpload, setCurrentUpload] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'cv' || name === 'cover_letter_file') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<{ url: string, livePreviewUrl: string }> => {
    if (!file) throw new Error('No file provided');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const storagePath = `${folder}/${fileName}`;

    setCurrentUpload(file.name);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('applications')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
        onUploadProgress: (progress) => {
          setUploadProgress(progress.percent);
        }
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('applications')
      .getPublicUrl(storagePath);

    // The live preview URL is the same as the public URL in this case
    return {
      url: urlData.publicUrl,
      livePreviewUrl: urlData.publicUrl
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');
    setUploadProgress(0);
    setCurrentUpload('');

    try {
      // Upload files if they exist
      let cvData = { url: undefined as string | undefined, livePreviewUrl: undefined as string | undefined };
      let coverLetterData = { url: undefined as string | undefined, livePreviewUrl: undefined as string | undefined };

      if (formData.cv) {
        cvData = await uploadFile(formData.cv, 'cvs');
      }

      if (formData.cover_letter_file) {
        coverLetterData = await uploadFile(formData.cover_letter_file, 'cover_letters');
      }

      // Prepare data for submission
      const submitData: JobApplicationSubmitData = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        phone_number_2: formData.phone_number_2 || undefined,
        current_residence: formData.current_residence,
        cv_url: cvData.url,
        cv_live_preview_url: cvData.livePreviewUrl,
        cover_letter_text: formData.cover_letter_text || undefined,
        cover_letter_url: coverLetterData.url,
        cover_letter_live_preview_url: coverLetterData.livePreviewUrl
      };

      // Submit form data to API route
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result: ApplicationResponse = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Application submitted successfully!');

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          phone_number_2: '',
          current_residence: '',
          cv: null,
          cover_letter_text: '',
          cover_letter_file: null
        });

        // Reset file inputs
        const cvInput = document.getElementById('cv') as HTMLInputElement;
        const coverLetterInput = document.getElementById('cover_letter_file') as HTMLInputElement;
        if (cvInput) cvInput.value = '';
        if (coverLetterInput) coverLetterInput.value = '';
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-90 rounded-full shadow-lg mb-4"
          >
            <Briefcase className="h-10 w-10 text-blue-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Our Team</h1>
          <p className="text-blue-100">We're excited to learn more about you and your qualifications</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="John Doe"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="john@example.com"
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="current_residence" className="block text-sm font-medium text-slate-700 mb-1">
                    Current Residence *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="current_residence"
                      name="current_residence"
                      value={formData.current_residence}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="City, Country"
                    />
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-slate-700 mb-1">
                    Primary Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="phone_number_2" className="block text-sm font-medium text-slate-700 mb-1">
                    Secondary Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone_number_2"
                      name="phone_number_2"
                      value={formData.phone_number_2}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Application Documents
              </h2>
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <label htmlFor="cv" className="block text-sm font-medium text-slate-700 mb-1">
                    CV (PDF, DOC, DOCX) *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      onChange={handleChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`flex items-center justify-between px-4 py-3 border-2 rounded-lg transition-colors ${
                      formData.cv ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
                    }`}>
                      <div className="flex items-center">
                        <Upload className="h-5 w-5 text-slate-400 mr-2" />
                        <span className={`text-sm ${formData.cv ? 'text-blue-700' : 'text-slate-600'}`}>
                          {formData.cv ? formData.cv.name : 'Choose your CV file'}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
                        Browse
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Max file size: 5MB</p>
                  {currentUpload === formData.cv?.name && uploadProgress > 0 && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Uploading: {Math.round(uploadProgress)}%</p>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="cover_letter_text" className="block text-sm font-medium text-slate-700 mb-1">
                    Cover Letter (Text)
                  </label>
                  <textarea
                    id="cover_letter_text"
                    name="cover_letter_text"
                    value={formData.cover_letter_text}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="cover_letter_file" className="block text-sm font-medium text-slate-700 mb-1">
                    Or Upload Cover Letter (PDF, DOC, DOCX)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cover_letter_file"
                      name="cover_letter_file"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`flex items-center justify-between px-4 py-3 border-2 rounded-lg transition-colors ${
                      formData.cover_letter_file ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:border-green-400'
                    }`}>
                      <div className="flex items-center">
                        <Upload className="h-5 w-5 text-slate-400 mr-2" />
                        <span className={`text-sm ${formData.cover_letter_file ? 'text-green-700' : 'text-slate-600'}`}>
                          {formData.cover_letter_file ? formData.cover_letter_file.name : 'Choose cover letter file'}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
                        Browse
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Max file size: 5MB</p>
                  {currentUpload === formData.cover_letter_file?.name && uploadProgress > 0 && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Uploading: {Math.round(uploadProgress)}%</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    {currentUpload ? `Uploading ${currentUpload}...` : 'Submitting...'}
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </motion.div>

            {/* Status Message */}
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg flex items-start ${
                  submitStatus === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                )}
                <p>{submitMessage}</p>
              </motion.div>
            )}
          </form>
        </motion.div>

        <div className="mt-8 text-center text-blue-100 text-sm">
          <p>We'll get back to you within 3-5 business days after reviewing your application.</p>
        </div>
      </motion.div>
    </div>
  );
}

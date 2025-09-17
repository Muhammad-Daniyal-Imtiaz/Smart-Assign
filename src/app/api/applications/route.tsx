import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Type definitions
interface JobApplicationSubmitData {
  name: string;
  email: string;
  phone_number: string;
  phone_number_2?: string;
  current_residence: string;
  cv_url?: string;
  cover_letter_text?: string;
  cover_letter_url?: string;
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

export async function POST(request: NextRequest) {
  try {
    const body: JobApplicationSubmitData = await request.json();
    const {
      name,
      email,
      phone_number,
      phone_number_2,
      current_residence,
      cv_url,
      cover_letter_text,
      cover_letter_url
    } = body;

    // Validate required fields
    if (!name || !email || !phone_number || !current_residence) {
      return NextResponse.json<ApplicationResponse>(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        {
          name,
          email,
          phone_number,
          phone_number_2: phone_number_2 || null,
          current_residence,
          cv_url: cv_url || null,
          cover_letter_text: cover_letter_text || null,
          cover_letter_url: cover_letter_url || null
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApplicationResponse>(
        { error: 'Failed to save application' },
        { status: 500 }
      );
    }

    return NextResponse.json<ApplicationResponse>(
      { message: 'Application submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json<ApplicationResponse>(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrnnslazwtrpuxdgxfvv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybm5zbGF6d3RycHV4ZGd4ZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNDE0ODMsImV4cCI6MjEwNTgxNzQ4M30.aTsutjJLOFPDR8fUHvCuWyuAz9-Y5jq7J1dKVPTNQ6M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
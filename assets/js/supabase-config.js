
// Initialize Supabase Client
const SUPABASE_URL = 'https://vyxoborfafubpkizyxty.supabase.co';
const SUPABASE_KEY = 'sb_publishable_WdrwInmbQ6rn7Tbu0yNu3g_TnjUjPpf';

let supabaseClient;

if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase Initialized');
} else {
    console.error('Supabase SDK not loaded!');
}

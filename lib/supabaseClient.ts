import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dhijwuslrhzovasuevyg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaWp3dXNscmh6b3Zhc3VldnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODc5MzksImV4cCI6MjA3NDY2MzkzOX0.m4v7fkRrQg0tHehtBCEPMyP45WHRX-VT8rMRmgVu5vU"
);

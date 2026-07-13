
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestPage() {
  useEffect(() => {
    const testConnection = async () => {
      if (!supabase) {
        console.log("Supabase is not configured");
        return;
      }

      const { data, error } = await supabase.from("events").select("*");

      console.log(data);
      console.log(error);
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Supabase Connected</h1>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function TextSummary() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an API call to a GPT-based service
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              summary: `The top-selling product is Product Z with $10,000 in revenue, followed by Product Y ($8,000) and Product X ($6,000). Consider bundling Product Y and X for upselling opportunities.`,
            }),
          1000,
        ),
      );
      setSummary(response.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("An error occurred while generating the summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text-Based Summary</CardTitle>
        <CardDescription>
          Get natural language summaries of your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Input
            placeholder="Enter your query (e.g., 'Top 3 products by sales this month')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={generateSummary} disabled={loading || !query}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Summary
          </Button>
        </div>
        {summary && (
          <div className="mt-4 rounded-md bg-muted p-4">
            <p>{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

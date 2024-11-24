import { useState } from "react";
import { RefreshCw } from "lucide-react"; // Assuming you're using lucide-react
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

function SyncButton({ onSync }: { onSync: () => Promise<void> | void }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleClick = async () => {
    if (isSyncing) return; // Prevent multiple clicks while syncing
    const result = onSync();

    // Check if `onSync` returns a Promise
    if (result instanceof Promise) {
      setIsSyncing(true);
      try {
        await result;
      } finally {
        setIsSyncing(false); // Re-enable the button after `onSync` completes
      }
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isSyncing} // Disable the button while syncing
    >
      <RefreshCw className={cn("size-4", isSyncing && "animate-spin")} />
      {isSyncing ? "Syncing..." : "Sync"}
    </Button>
  );
}

export default SyncButton;

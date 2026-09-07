"use client";

import { Hash, CheckCircle2, ShieldAlert } from "lucide-react";

interface LedgerBlock {
  index: number;
  timestamp: string;
  ulpin: string;
  transaction_id: string;
  event_type: string;
  previous_hash: string;
  payload_hash: string;
  state_after_transition_hash: string;
  department_signatures: Record<string, string>;
  block_hash: string;
}

interface LedgerTimelineProps {
  blocks: LedgerBlock[];
}

export default function LedgerTimeline({ blocks }: LedgerTimelineProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs">
        No state transition blocks recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blocks.map((b) => (
        <div
          key={b.block_hash}
          className="relative pl-6 pb-4 border-l-2 border-emerald-300 last:border-l-0 last:pb-0"
        >
          {/* Timeline bullet */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-xs font-black text-emerald-700">
                Block #{b.index} • {b.event_type}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {new Date(b.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="text-[11px] font-mono text-slate-700 space-y-1">
              <div className="truncate">
                <span className="text-slate-500 font-sans font-bold">Block Hash: </span>
                <span className="text-slate-900 font-bold">{b.block_hash}</span>
              </div>
              <div className="truncate">
                <span className="text-slate-500 font-sans font-bold">Prev Hash: </span>
                <span className="text-slate-600">{b.previous_hash}</span>
              </div>
              <div>
                <span className="text-slate-500 font-sans font-bold">Transaction ID: </span>
                <span className="text-slate-900 font-bold">{b.transaction_id}</span>
                {b.ulpin && b.ulpin !== "GENESIS" && (
                  <span className="text-emerald-700 ml-2 font-bold">• {b.ulpin}</span>
                )}
              </div>
            </div>

            {/* Department Signatures */}
            {Object.keys(b.department_signatures || {}).length > 0 && (
              <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1.5">
                {Object.entries(b.department_signatures).map(([dept, sig]) => (
                  <span
                    key={dept}
                    className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-mono"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{dept}: {sig}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

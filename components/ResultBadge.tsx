import { PickResult } from "@/lib/picks";

const STYLES: Record<PickResult, string> = {
  win: "bg-edge/15 text-edge",
  loss: "bg-warn/15 text-warn",
  push: "bg-mist/15 text-mist",
  pending: "bg-volt/15 text-volt",
};

const LABELS: Record<PickResult, string> = {
  win: "Win",
  loss: "Loss",
  push: "Push",
  pending: "Pending",
};

export default function ResultBadge({ result }: { result: PickResult }) {
  return <span className={`badge ${STYLES[result]}`}>{LABELS[result]}</span>;
}

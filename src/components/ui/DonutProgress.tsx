interface Props {
  value: number;
  size?: number;
  thickness?: number;
  label: string;
  trackClass?: string;
  progressClass?: string;
  progressBorderClass?: string;
}

/**
 * Reusable SVG Donut Progress
 * - value: 0 ~ 1 (e.g., 0.5 = 50%)
 * - size: px (width/height)
 * - thickness: ring stroke width
 * - label: optional center label text
 */
export default function DonutProgress({
  value,
  size = 140,
  thickness = 14,
  label,
  trackClass = "stroke-neutral-200",
  progressClass = "fill-orange-500",
  progressBorderClass = "stroke-neutral-500",
}: Props) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.max(0, Math.min(1, value)) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="overflow-visible"
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className={trackClass}
        fill="none"
        strokeWidth={thickness}
      />

      {/* Progress fill with border */}
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {/* Border outline */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${progressBorderClass} transition-[stroke-dasharray] duration-500 ease-out`}
          fill="none"
          strokeWidth={thickness + 2.5}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${progressClass} transition-[stroke-dasharray] duration-500 ease-out`}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </g>

      {/* Center label */}
      {label && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-neutral-500 text-xl font-semibold"
        >
          {label}
        </text>
      )}
    </svg>
  );
}

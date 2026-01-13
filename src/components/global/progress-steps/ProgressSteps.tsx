"use client";

import React from "react";
import { useProgressSteps } from "./ProgressStepsContext";

type Props = {
  className?: string;

  /** allow clicking to jump to steps */
  clickable?: boolean;

  /** if true, user can't jump to future steps (only current/past) */
  lockFutureSteps?: boolean;

  /** optional callback when step changes */
  onStepChange?: (index: number) => void;
};

export function ProgressSteps({
  className = "",
  clickable = true,
  lockFutureSteps = true,
  onStepChange,
}: Props) {
  const { steps, currentIndex, setCurrentIndex, isComplete } =
    useProgressSteps();

  const canGoTo = (idx: number) => {
    const step = steps[idx];
    if (!step) return false;
    if (step.isDisabled) return false;
    if (!clickable) return false;
    if (lockFutureSteps && idx > currentIndex) return false;
    return true;
  };

  const handleClick = (idx: number) => {
    if (!canGoTo(idx)) return;
    setCurrentIndex(idx);
    onStepChange?.(idx);
  };

  return (
    <div className={`w-full ${className}`}>
      <ol className='relative'>
        {steps.map((step, idx) => {
          const active = idx === currentIndex;
          const done = isComplete(idx);

          const dotClasses = active
            ? "bg-primary ring-primary/40"
            : done
            ? "bg-primary ring-primary/40"
            : "bg-muted-foreground ring-muted-foreground/40";

          const textClasses = active
            ? "text-muted-foreground"
            : done
            ? "text-muted-forground"
            : "text-muted-forground";

          const subtitleClasses = active
            ? "text-muted-foreground"
            : "text-muted-forground";

          const disabled =
            step.isDisabled || (lockFutureSteps && idx > currentIndex);
          const rowClickable = canGoTo(idx);

          return (
            <li key={step.id} className='flex items-start gap-5'>
              {/* Left timeline */}
              <div className='relative flex flex-col items-center'>
                <button
                  type='button'
                  onClick={() => handleClick(idx)}
                  disabled={!rowClickable}
                  aria-current={active ? "step" : undefined}
                  className={[
                    "mt-2.5 h-4 w-4 rounded-full ring-4 transition",
                    dotClasses,
                    rowClickable
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-80",
                  ].join(" ")}
                />

                {/* Connector line */}
                {idx !== steps.length - 1 && (
                  <div className='my-1 h-14 w-px bg-muted-foreground/40' />
                )}
              </div>

              {/* Text */}
              <button
                type='button'
                onClick={() => handleClick(idx)}
                disabled={!rowClickable}
                className={[
                  "text-left pb-6",
                  rowClickable ? "cursor-pointer" : "cursor-not-allowed",
                  disabled ? "opacity-80" : "",
                ].join(" ")}
              >
                <div
                  className={`lg:text-xl md:text-lg text-sm font-semibold leading-6 ${textClasses}`}
                >
                  {step.title}
                  {step.isOptional ? (
                    <span className='ml-2 text-xs font-medium text-muted-foreground'>
                      (Optional)
                    </span>
                  ) : null}
                </div>
                {step.subtitle ? (
                  <div className={`text-xs leading-4 ${subtitleClasses}`}>
                    {step.subtitle}
                  </div>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

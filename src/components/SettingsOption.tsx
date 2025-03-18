
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SettingsOptionProps {
  title: string;
  description?: string;
  type: "toggle" | "slider" | "time";
  icon?: React.ReactNode;
  value: boolean | number | string;
  onChange: (value: any) => void;
  className?: string;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  title,
  description,
  type,
  icon,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("glass-card p-4 mb-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon && <div className="mr-3 text-secure-green">{icon}</div>}
          <div>
            <h3 className="font-medium text-white">{title}</h3>
            {description && <p className="text-sm text-gray-300">{description}</p>}
          </div>
        </div>

        {type === "toggle" && (
          <Switch
            checked={value as boolean}
            onCheckedChange={onChange}
            className="data-[state=checked]:bg-secure-green"
          />
        )}
      </div>

      {type === "slider" && (
        <div className="pt-4">
          <Slider
            defaultValue={[value as number]}
            max={100}
            step={1}
            onValueChange={(vals) => onChange(vals[0])}
            className="[&_[role=slider]]:bg-secure-green"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {type === "time" && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Start Time</label>
            <input
              type="time"
              value={(value as string).split(" - ")[0]}
              onChange={(e) => {
                const endTime = (value as string).split(" - ")[1];
                onChange(`${e.target.value} - ${endTime}`);
              }}
              className="bg-secure-gray text-white rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">End Time</label>
            <input
              type="time"
              value={(value as string).split(" - ")[1]}
              onChange={(e) => {
                const startTime = (value as string).split(" - ")[0];
                onChange(`${startTime} - ${e.target.value}`);
              }}
              className="bg-secure-gray text-white rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsOption;

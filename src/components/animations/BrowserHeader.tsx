import * as Icons from 'lucide-react';

interface BrowserHeaderProps {
  url: string;
  icon?: keyof typeof Icons;
}

export default function BrowserHeader({ url, icon = 'Globe' }: BrowserHeaderProps) {
  const Icon = Icons[icon];
  
  return (
    <div className="bg-[#2D2D2D] p-3 flex items-center gap-2 border-b border-gray-800">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="flex-1 mx-4">
        <div className="bg-[#1E1E1E] rounded-md p-2 flex items-center gap-2 max-w-xl mx-auto">
          <Icon className="w-4 h-4 text-gray-500" />
          <span className="text-gray-400 text-sm">{url}</span>
        </div>
      </div>
    </div>
  );
}
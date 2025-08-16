import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

export type PostFilterInputProps = {
  value: string;
  onChange: (value: string) => void;
};


export const FilterInput = ({ onChange, value }: PostFilterInputProps) => {
  return (
    <div className='relative w-full max-w-sm items-center'>
      <Input
        type='text'
        placeholder='Search user stories...'
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full max-w-sm px-10'
      />
      <span className='absolute start-0 inset-y-0 flex items-center justify-center px-2'>
        <Search className='size-4 text-muted-foreground' />
      </span>
      {value && (
        <button
          className='absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer group'
          onClick={() => onChange('')}
        >
          <X className='size-4 text-muted-foreground group-hover:fill-slate-900' />
        </button>
      )}
    </div>
  );
};

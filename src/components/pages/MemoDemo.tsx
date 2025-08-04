import { useState } from 'react';
import { CustomComparisonDemo, DeepMemoDemo, ShallowMemoDemo } from '../../utils/customMemo';
import { Button } from '../ui/button';

export function MemoDemo() {
  const [name, setName] = useState('John');
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ id: '1', email: 'john@example.com' });
  const [items, setItems] = useState(['item1', 'item2']);

  const handleUpdateUser = () => {
    // This creates a new object reference but with same values
    setUser({ ...user });
  };

  const handleUpdateItems = () => {
    // This creates a new array reference but with same values
    setItems([...items]);
  };

  const handleChangeUserEmail = () => {
    setUser({ ...user, email: 'jane@example.com' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Custom React.memo() Demo</h1>
        <p className="text-gray-600 mb-4">
          This demonstrates a custom React.memo implementation with shallow vs deep comparison.
          Check the browser console to see the comparison logs.
        </p>
        
        <div className="space-x-2 mb-6">
          <Button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>
            Toggle Name ({name})
          </Button>
          <Button onClick={() => setCount(count + 1)}>
            Increment Count ({count})
          </Button>
          <Button onClick={handleUpdateUser}>
            Update User (Same Values)
          </Button>
          <Button onClick={handleUpdateItems}>
            Update Items (Same Values)
          </Button>
          <Button onClick={handleChangeUserEmail}>
            Change User Email
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Shallow Comparison Memo</h2>
          <p className="text-sm text-gray-600">
            Re-renders when any prop reference changes (even if values are the same)
          </p>
          <ShallowMemoDemo name={name} count={count} user={user} items={items} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Deep Comparison Memo</h2>
          <p className="text-sm text-gray-600">
            Re-renders only when prop values actually change
          </p>
          <DeepMemoDemo name={name} count={count} user={user} items={items} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Custom Comparison Memo</h2>
          <p className="text-sm text-gray-600">
            Re-renders only when count changes (ignores other props)
          </p>
          <CustomComparisonDemo name={name} count={count} user={user} items={items} />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Key Differences:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li><strong>Shallow Comparison:</strong> Compares object references (===)</li>
          <li><strong>Deep Comparison:</strong> Compares actual values using JSON.stringify</li>
          <li><strong>Custom Comparison:</strong> Uses a custom function to determine re-rendering</li>
        </ul>
      </div>
    </div>
  );
}

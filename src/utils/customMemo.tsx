import type { ComponentType } from 'react';
import { createElement, useRef } from 'react';

// Custom shallow comparison function
function shallowCompare(prevProps: Record<string, unknown>, nextProps: Record<string, unknown>): boolean {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);

  // If different number of keys, props are different
  if (prevKeys.length !== nextKeys.length) {
    console.log('🔄 Props changed: Different number of keys');
    return false;
  }

  // Check if any key-value pairs are different (shallow comparison)
  for (const key of prevKeys) {
    if (prevProps[key] !== nextProps[key]) {
      console.log(`🔄 Props changed: ${key} changed from`, prevProps[key], 'to', nextProps[key]);
      return false;
    }
  }

  console.log('✅ Props are the same (shallow comparison)');
  return true;
}

// Deep comparison function for demonstration
function deepCompare(prevProps: Record<string, unknown>, nextProps: Record<string, unknown>): boolean {
  try {
    const result = JSON.stringify(prevProps) === JSON.stringify(nextProps);
    if (result) {
      console.log('✅ Props are the same (deep comparison)');
    } else {
      console.log('🔄 Props changed (deep comparison)');
    }
    return result;
  } catch {
    console.log('⚠️ Deep comparison failed, falling back to shallow');
    return shallowCompare(prevProps, nextProps);
  }
}

// Custom memo implementation
export function customMemo<P extends object>(
  Component: ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean,
  useDeepComparison: boolean = false
) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | undefined>(undefined);
    const memoizedComponentRef = useRef<React.ReactElement | undefined>(undefined);

    // Get comparison function
    const compareFunction = areEqual || (useDeepComparison ? deepCompare : shallowCompare);

    // Check if we should re-render
    const shouldRerender = !prevPropsRef.current || !compareFunction(prevPropsRef.current as Record<string, unknown>, props as Record<string, unknown>);

    if (shouldRerender) {
      console.log(`🎨 Rendering ${Component.displayName || Component.name}`);
      memoizedComponentRef.current = createElement(Component, props);
      prevPropsRef.current = { ...props };
    } else {
      console.log(`⚡ Skipping render for ${Component.displayName || Component.name}`);
    }

    return memoizedComponentRef.current!;
  };
}

// Demonstration component
interface DemoProps {
  name: string;
  count: number;
  user: {
    id: string;
    email: string;
  };
  items: string[];
}

function DemoComponent({ name, count, user, items }: DemoProps) {
  console.log('🎯 DemoComponent rendered with:', { name, count, user, items });
  
  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="font-semibold">Demo Component</h3>
      <p>Name: {name}</p>
      <p>Count: {count}</p>
      <p>User: {user.email}</p>
      <p>Items: {items.join(', ')}</p>
    </div>
  );
}

// Memoized versions
export const ShallowMemoDemo = customMemo(DemoComponent, undefined, false);
export const DeepMemoDemo = customMemo(DemoComponent, undefined, true);

// Custom comparison example
export const CustomComparisonDemo = customMemo(
  DemoComponent,
  (prevProps, nextProps) => {
    // Only re-render if count changes
    const shouldRerender = prevProps.count !== nextProps.count;
    console.log(`🎯 Custom comparison: count changed? ${!shouldRerender}`);
    return shouldRerender;
  }
);

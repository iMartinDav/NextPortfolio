'use client';

import * as React from 'react';

import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

// Constants that control toast behavior
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

// TypeScript interface for toast data structure
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Action types as const object for better maintainability
const TOAST_ACTIONS = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST'
} as const;

// Type for all possible actions, using the TOAST_ACTIONS constant
type Action =
  | {
      type: typeof TOAST_ACTIONS.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof TOAST_ACTIONS.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: typeof TOAST_ACTIONS.DISMISS_TOAST;
      toastId?: ToasterToast['id'];
    }
  | {
      type: typeof TOAST_ACTIONS.REMOVE_TOAST;
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

// Map to track timeout IDs for toast removal
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adds a toast to the removal queue, with debouncing protection
 */
const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: TOAST_ACTIONS.REMOVE_TOAST,
      toastId
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Clear all pending toast removal timeouts
 */
const clearRemoveQueue = (): void => {
  for (const timeout of toastTimeouts.values()) {
    clearTimeout(timeout);
  }
  toastTimeouts.clear();
};

/**
 * Reducer to handle toast state changes
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case TOAST_ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };

    case TOAST_ACTIONS.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };

    case TOAST_ACTIONS.DISMISS_TOAST: {
      const { toastId } = action;

      // Side effects: Add to remove queue
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        for (const toast of state.toasts) {
          addToRemoveQueue(toast.id);
        }
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false
              }
            : t
        )
      };
    }
    case TOAST_ACTIONS.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};

// Array to track subscriber functions
const listeners: Array<(state: State) => void> = [];

// In-memory state (singleton pattern)
let memoryState: State = { toasts: [] };

/**
 * Dispatches an action to the toast system and notifies listeners
 */
function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);
  for (const listener of listeners) {
    listener(memoryState);
  }
}

// Type for toast creation without requiring an ID
type Toast = Omit<ToasterToast, 'id'>;

/**
 * Generates a unique ID for each toast
 */
function genId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Creates a new toast notification
 */
function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: Partial<ToasterToast>) =>
    dispatch({
      type: TOAST_ACTIONS.UPDATE_TOAST,
      toast: { ...props, id }
    });

  const dismiss = () =>
    dispatch({
      type: TOAST_ACTIONS.DISMISS_TOAST,
      toastId: id
    });

  dispatch({
    type: TOAST_ACTIONS.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });

  return {
    id,
    dismiss,
    update
  };
}

/**
 * React hook to access and manage toast state
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    // Subscribe to state changes
    listeners.push(setState);

    // Cleanup listener on component unmount
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  // When no toasts are present, clean up any pending timeouts
  React.useEffect(() => {
    if (state.toasts.length === 0) {
      clearRemoveQueue();
    }
  }, [state.toasts.length]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({
        type: TOAST_ACTIONS.DISMISS_TOAST,
        toastId
      })
  };
}

export { useToast, toast };

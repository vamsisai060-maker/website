import type { ExoticComponent, ReactNode, Ref } from 'react';

declare module 'react' {
  export interface ViewTransitionInstance {
    name: string;
  }

  export type ViewTransitionClassPerType = Record<
    'default' | (string & {}),
    'none' | 'auto' | (string & {})
  >;
  export type ViewTransitionClass =
    | ViewTransitionClassPerType
    | ViewTransitionClassPerType[string];

  export interface ViewTransitionProps {
    children?: ReactNode | undefined;
    default?: ViewTransitionClass | undefined;
    enter?: ViewTransitionClass | undefined;
    exit?: ViewTransitionClass | undefined;
    name?: 'auto' | (string & {}) | undefined;
    onEnter?:
      | ((
          instance: ViewTransitionInstance,
          types: Array<string>,
        ) => void | (() => void))
      | undefined;
    onExit?:
      | ((
          instance: ViewTransitionInstance,
          types: Array<string>,
        ) => void | (() => void))
      | undefined;
    onShare?:
      | ((
          instance: ViewTransitionInstance,
          types: Array<string>,
        ) => void | (() => void))
      | undefined;
    onUpdate?:
      | ((
          instance: ViewTransitionInstance,
          types: Array<string>,
        ) => void | (() => void))
      | undefined;
    ref?: Ref<ViewTransitionInstance> | undefined;
    share?: ViewTransitionClass | undefined;
    update?: ViewTransitionClass | undefined;
  }

  export const ViewTransition: ExoticComponent<ViewTransitionProps>;

  export function addTransitionType(type: string): void;
}

import * as React from 'react';
import { hyphenated } from 'hyphenated';

const Hyphenated = (language = 'enUs') => ({ children }: any): any => {
  handleDangerouslySetInnerHTML(children, language);
  const childrenCount = React.Children.count(children);
  const hyphenateChild = (child: any) => {
    if (child === null) {
      return null;
    } else if (child.type === Hyphenated) {
      return child;
    } else if (typeof child === 'string') {
      return hyphenated(child, { language });
    } else {
      const { children, ...props } = child.props;
      return children
        ? React.cloneElement(child, props, Hyphenated(language)({ children }))
        : child;
    }
  };
  if (childrenCount === 1) {
    return hyphenateChild(children);
  }
  return React.Children.map(children, hyphenateChild);
};

export default function useHyphen(language?: string) {
  const Hyphen = React.useMemo(() => {
    return Hyphenated(language);
  }, [language]);

  return {
    Hyphen,
    h: hyphenated,
  } as any;
}

function handleDangerouslySetInnerHTML(children: any, language: any) {
  if (children && children.props && children.props.dangerouslySetInnerHTML) {
    children.props.dangerouslySetInnerHTML.__html = hyphenated(
      children.props.dangerouslySetInnerHTML.__html,
      { language }
    );
  }
}

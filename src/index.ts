import * as React from 'react';
import { hyphenated, LanguageParam } from 'hyphenated';

interface HyphenatedProps {
  children?: React.ReactNode;
}

const Hyphenated = (language?: LanguageParam) => {
  const HyphenateComp = ({ children }: HyphenatedProps): any => {
    handleDangerouslySetInnerHTML(children as React.ReactElement, language);
    const childrenCount = React.Children.count(children);
    const hyphenateChild = (child: React.ReactElement | null) => {
      if (child === null) {
        return (null as unknown) as React.ReactElement;
      } else if (child.type === HyphenateComp) {
        return child;
      } else if (typeof child === 'string') {
        return (hyphenated(child, {
          language,
        }) as unknown) as React.ReactElement;
      } else {
        const { children: propsChildren, ...props } = child.props;
        return propsChildren
          ? React.cloneElement(
              child,
              props,
              Hyphenated(language)({ children: propsChildren })
            )
          : child;
      }
    };
    if (childrenCount === 1) {
      return hyphenateChild(children as React.ReactElement);
    }

    return React.Children.map(children as React.ReactElement, hyphenateChild);
  };

  return HyphenateComp;
};

export default function useHyphen(language?: LanguageParam) {
  const Hyphen = React.useMemo(() => {
    return Hyphenated(language);
  }, [language]);

  return {
    Hyphen,
    h: hyphenated,
  };
}

function handleDangerouslySetInnerHTML(
  children: React.ReactElement,
  language?: LanguageParam
) {
  if (children && children.props && children.props.dangerouslySetInnerHTML) {
    children.props.dangerouslySetInnerHTML.__html = hyphenated(
      children.props.dangerouslySetInnerHTML.__html,
      { language }
    );
  }
}

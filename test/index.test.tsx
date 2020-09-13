import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import useHyphen from '../src/index';

const softHyphen = '\u00AD';
const hyphenate = (...syllables: string[]) => syllables.join(softHyphen);

describe('useHyphen', (): void => {
  describe('Setup', () => {
    it('Returns initial value', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <Hyphen>
          <div data-testid="hyphen-text">hyphenated</div>
        </Hyphen>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate('hy', 'phen', 'at', 'ed')
      );
    });

    it('Returns initial value with preferred lang', () => {
      const { result } = renderHook(() => useHyphen('enUs'));
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <Hyphen>
          <div data-testid="hyphen-text">hyphenated</div>
        </Hyphen>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate('hy', 'phen', 'at', 'ed')
      );
    });

    it('Doesn{t crash if child is null', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <div data-testid="hyphen-text">
          <Hyphen>
            <span>Hyphen</span>
            {null}
            <div>Hyphen</div>
          </Hyphen>
        </div>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        `${hyphenate('Hy', 'phen')}${hyphenate('Hy', 'phen')}`
      );
    });

    it('hyphenates text which consists of multiple nodes', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <div data-testid="hyphen-text">
          <Hyphen>
            <strong>Scribbler</strong>, <span>n.</span> A professional writer
            whose views are antagonistic to one’s own.
          </Hyphen>
        </div>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate(
          'Scrib',
          'bler, n. A pro',
          'fes',
          'sion',
          'al writer whose views are an',
          'tag',
          'o',
          'nis',
          'tic to one’s own.'
        )
      );
    });

    it('hyphenates text which consists of multiple nested nodes', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <div data-testid="hyphen-text">
          <Hyphen>
            From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
            <section>
              <p>
                <strong>Scribbler</strong>, <em>n.</em> A professional writer
                whose views are antagonistic to one’s own.
              </p>
              <p>
                <strong>Self-evident</strong>, <em>adj.</em> Evident to one’s
                self and to nobody else.
              </p>
            </section>
          </Hyphen>
        </div>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate(
          'From Am',
          'brose Bierce’s Dev',
          'il’s Dic',
          'tio',
          'nary:Scrib',
          'bler, n. A pro',
          'fes',
          'sion',
          'al writer whose views are an',
          'tag',
          'o',
          'nis',
          'tic to one’s own.Self-ev',
          'i',
          'dent, adj. Ev',
          'i',
          'dent to one’s self and to no',
          'body else.'
        )
      );
    });

    it('hyphenates text which consists of React components', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <div data-testid="hyphen-text">
          <Hyphen>
            From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
            <section>
              <p>
                <strong>Scribbler</strong>, <em>n.</em> A professional writer
                whose views are antagonistic to one’s own.
              </p>
              <p>
                <strong>Self-evident</strong>, <em>adj.</em> Evident to one’s
                self and to nobody else.
              </p>
            </section>
          </Hyphen>
        </div>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate(
          'From Am',
          'brose Bierce’s Dev',
          'il’s Dic',
          'tio',
          'nary:Scrib',
          'bler, n. A pro',
          'fes',
          'sion',
          'al writer whose views are an',
          'tag',
          'o',
          'nis',
          'tic to one’s own.Self-ev',
          'i',
          'dent, adj. Ev',
          'i',
          'dent to one’s self and to no',
          'body else.'
        )
      );
    });

    it('hyphenates text which contains nested Hyphenated components', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const { getByTestId } = render(
        <div data-testid="hyphen-text">
          <Hyphen>
            From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
            <Hyphen>
              <p>
                <strong>
                  <Hyphen>Scribbler</Hyphen>
                </strong>
                , <em>n.</em> A professional writer whose views are antagonistic
                to one’s own.
              </p>
            </Hyphen>
          </Hyphen>
        </div>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate(
          'From Am',
          'brose Bierce’s Dev',
          'il’s Dic',
          'tio',
          'nary:Scrib',
          'bler, n. A pro',
          'fes',
          'sion',
          'al writer whose views are an',
          'tag',
          'o',
          'nis',
          'tic to one’s own.'
        )
      );
    });

    it('hyphenates markup from dangerouslySetInnerHTML', () => {
      const { result } = renderHook(() => useHyphen());
      const { Hyphen } = result.current;

      const __html = `<strong>Scribbler</strong>, <span>n.</span> A professional writer whose views are antagonistic to one’s own.`;
      const { getByTestId } = render(
        <div data-testid="hyphen-text">
          <Hyphen>
            <section dangerouslySetInnerHTML={{ __html }} />
          </Hyphen>
        </div>
      );
      expect(getByTestId('hyphen-text').textContent).toEqual(
        hyphenate(
          'Scrib',
          'bler, n. A pro',
          'fes',
          'sion',
          'al writer whose views are an',
          'tag',
          'o',
          'nis',
          'tic to one’s own.'
        )
      );
    });
  });
});

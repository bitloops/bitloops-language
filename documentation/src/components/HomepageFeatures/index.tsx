import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

type SectionItem = {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  button: { title: string; link: string };
};

const SectionList: SectionItem[] = [
  {
    Svg: require('@site/static/img/Bitloops-Language-Logo.svg').default,
    button: {
      title: 'Bitloops Language',
      link: '/docs/bitloops-language/category/introduction',
    },
  },
];

function Section({ Svg, button }: SectionItem) {
  return (
    // <div className={clsx('col col--4')}>
    <div className={clsx('col')}>
      <div className={styles.section}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Link
            className="button button--secondary button--lg"
            to={button.link}
          >
            {button.title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      {SectionList.map((props, idx) => (
        <Section key={idx} {...props} />
      ))}
    </section>
  );
}

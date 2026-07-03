import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/* ── Data ─────────────────────────────────────────────────────── */

const STATS = [
  { value: '40+', label: 'Componentes' },
  { value: '200+', label: 'Tokens de diseño' },
  { value: 'WCAG 2.2', label: 'Cumplimiento AA' },
  { value: '500+', label: 'Aplicativos Poli' },
];

const CATEGORIES = [
  {
    icon: '◈',
    title: 'Fundamentos',
    href: '/foundations/introduccion',
  },
  {
    icon: '⬡',
    title: 'Guías',
    href: '/docs/intro',
  },
  {
    icon: '◫',
    title: 'Componentes',
    href: '/components/icon',
  },
];

/* ── Component ────────────────────────────────────────────────── */

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Inicio" description={siteConfig.tagline} noFooter={false}>
      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroContent}>
            {/* Placeholder para logo — equipo de diseño reemplaza */}
            

            <div className={styles.heroBadge}>Design System v2.0</div>

            <h1 className={styles.heroTitle}>
              Poli<br />
              <span className={styles.heroTitleAccent}>Design System</span>
            </h1>

            <p className={styles.heroTagline}>
              {siteConfig.tagline}
            </p>

            <div className={styles.heroCtas}>
              <Link className={styles.ctaPrimary} to="/foundations/introduccion">
                Explorar documentación
              </Link>
              <a
                className={styles.ctaSecondary}
                href="https://juan-orjuela-q.github.io/poli_design_system/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Storybook ↗
              </a>
            </div>
          </div>

          <div className={styles.heroIllustration} aria-hidden="true">
            <img
              src={require('@site/static/img/cover-design-system.png').default}
              alt=""
              className={styles.heroIllustrationImg}
            />
          </div>

          <div className={styles.heroDivider} aria-hidden="true" />
        </section>

        {/* ── Stats ── */}
        <section className={styles.statsBar}>
          <div className={styles.container}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Documentación</span>
              <h2 className={styles.sectionTitle}>Explora el sistema</h2>
            </div>

            <div className={styles.categoriesGrid}>
              {CATEGORIES.map((cat) => (
                <Link key={cat.title} to={cat.href} className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>{cat.icon}</div>
                  <div className={styles.categoryBody}>
                    <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  </div>
                  <span className={styles.categoryArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Storybook CTA ── */}
        <section className={styles.storybookCta}>
          <div className={styles.container}>
            <div className={styles.storybookPreview} aria-hidden="true">
              <img
                src={require('@site/static/img/intefaz-de-sistema-storybook-para-politecnico-grancolombiano.jpg').default}
                alt=""
                className={styles.storybookPreviewImg}
              />
            </div>
            <div className={styles.storybookCtaContent}>
              <span className={styles.sectionEyebrow}>Storybook</span>
              <h2 className={styles.storybookCtaTitle}>Explora los componentes en vivo</h2>
              <p className={styles.storybookCtaDesc}>
                Cada componente tiene stories interactivos con controles para todas las variantes, tamaños y estados.
              </p>
              <a
                className={styles.ctaPrimary}
                href="https://juan-orjuela-q.github.io/poli_design_system/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Storybook ↗
              </a>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}

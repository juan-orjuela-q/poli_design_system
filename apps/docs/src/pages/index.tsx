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
    description: 'Tokens de color, tipografía, espaciado y principios de accesibilidad que sostienen el sistema.',
    href: '/docs/foundations/introduccion',
    tag: 'Base',
    tagColor: 'cyan',
  },
  {
    icon: '⬡',
    title: 'Componentes Atómicos',
    description: 'Icon, Button, Badge, Tag, Link, CTA, Loading Circle — los bloques de construcción del DS.',
    href: '/docs/components/icon',
    tag: 'Fase 1–2 ✓',
    tagColor: 'green',
  },
  {
    icon: '◫',
    title: 'Formularios',
    description: 'Checkbox, Radio, Toggle, Input, Select, Textarea — control de accesibilidad completo con CVA.',
    href: '/docs/components/checkbox',
    tag: 'Fase 4 ✓',
    tagColor: 'green',
  },
  {
    icon: '⬕',
    title: 'Navegación',
    description: 'Tabs, Stepper, Avatar Button, Sidenav, Breadcrumb, Paginator — patrones APG.',
    href: '/docs/components/tabs',
    tag: 'Fase 5 ✓',
    tagColor: 'green',
  },
  {
    icon: '◻',
    title: 'Overlays',
    description: 'Dialog, Modal, Notification, Tooltip — focus trap CDK, scroll lock y auto-dismiss.',
    href: '/docs/components/notification',
    tag: 'Fase 3 ✓',
    tagColor: 'green',
  },
  {
    icon: '⬔',
    title: 'Complejos',
    description: 'Accordion, Table, Selectable Card, Code Block, Date Picker, File Uploader — próximamente.',
    href: '/docs/components/accordion',
    tag: 'Fase 6',
    tagColor: 'yellow',
  },
];

const PHASES = [
  { number: '01', label: 'Atómicos', status: 'done', items: 'Icon · Button · Badge · Tag · Link · CTA · Loading · Helper Text · Progress Bar' },
  { number: '02', label: 'Icon + Button', status: 'done', items: 'Icon Button · Tooltip' },
  { number: '03', label: 'Compuestos', status: 'done', items: 'Notification · Dialog · Modal' },
  { number: '04', label: 'Formularios', status: 'done', items: 'Checkbox · Radio · Toggle · Input · Select · Textarea' },
  { number: '05', label: 'Navegación', status: 'done', items: 'Tabs · Stepper · Avatar Button · Sidenav · Stepper Compact' },
  { number: '06', label: 'Complejos', status: 'pending', items: 'Date Picker · File Uploader · Range · Accordion · Table · Card · Code Block' },
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
              <Link className={styles.ctaPrimary} to="/docs/foundations/introduccion">
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
              <p className={styles.sectionSubtitle}>
                Cada categoría incluye API completa, tokens aplicados, guías de accesibilidad y Stories de Storybook.
              </p>
            </div>

            <div className={styles.categoriesGrid}>
              {CATEGORIES.map((cat) => (
                <Link key={cat.title} to={cat.href} className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>{cat.icon}</div>
                  <div className={styles.categoryBody}>
                    <div className={styles.categoryMeta}>
                      <span className={`${styles.categoryTag} ${styles[`categoryTag--${cat.tagColor}`]}`}>
                        {cat.tag}
                      </span>
                    </div>
                    <h3 className={styles.categoryTitle}>{cat.title}</h3>
                    <p className={styles.categoryDesc}>{cat.description}</p>
                  </div>
                  <span className={styles.categoryArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className={styles.sectionDark}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Hoja de ruta</span>
              <h2 className={styles.sectionTitle}>Estado del proyecto</h2>
            </div>

            <div className={styles.phases}>
              {PHASES.map((p) => (
                <div key={p.number} className={`${styles.phase} ${styles[`phase--${p.status}`]}`}>
                  <div className={styles.phaseNumber}>{p.number}</div>
                  <div className={styles.phaseBody}>
                    <div className={styles.phaseHeader}>
                      <span className={styles.phaseLabel}>{p.label}</span>
                      {p.status === 'done'
                        ? <span className={styles.phaseBadgeDone}>Completa</span>
                        : <span className={styles.phaseBadgePending}>En progreso</span>
                      }
                    </div>
                    <p className={styles.phaseItems}>{p.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Storybook CTA ── */}
        <section className={styles.storybookCta}>
          <div className={styles.container}>
            {/* Placeholder para imagen de Storybook — equipo de diseño reemplaza */}
            <div className={styles.storybookPreview} aria-hidden="true">
              <span className={styles.storybookPreviewLabel}>
                [Screenshot de Storybook]<br />
                <small>1600 × 900 px · PNG</small>
              </span>
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

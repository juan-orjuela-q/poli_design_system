import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

export interface TabItem {
  id: string;
  label: string;
  /** Optional icon name (pds-icon). Renders above the label. */
  icon?: string;
  disabled?: boolean;
}

let tabsCounter = 0;

@Component({
  selector: 'pds-tabs',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-tabs.component.html',
  styleUrl: './pds-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsTabsComponent {
  /** Unique ID for this instance (used to generate tab/panel IDs). */
  readonly tabsId = `pds-tabs-${++tabsCounter}`;

  private readonly elementRef = inject(ElementRef);

  // ── Inputs ──────────────────────────────────────────────────────────────────
  /** Tab definitions. Each item has an id, a label and optionally an icon name and disabled flag. */
  readonly tabs = input.required<TabItem[]>();

  /** ID of the currently active tab. If empty the first non-disabled tab is active. */
  readonly activeTab = input<string>('');

  /** aria-label for the tablist element. Provide a meaningful description. */
  readonly ariaLabel = input<string>('Navegación por pestañas');

  // ── Outputs ─────────────────────────────────────────────────────────────────
  /** Emits the id of the newly selected tab. */
  readonly tabChange = output<string>();

  // ── Internal state ───────────────────────────────────────────────────────────
  private readonly internalActiveTab = signal<string>('');

  constructor() {
    // Sync the controlled activeTab input → internal state
    effect(() => {
      const active = this.activeTab();
      if (active) {
        this.internalActiveTab.set(active);
      }
    });
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
  /** Returns the HTML id for a tab button. */
  getTabId(tabId: string): string {
    return `pds-tab-${this.tabsId}-${tabId}`;
  }

  /**
   * Returns the HTML id expected for the associated tab panel.
   * The parent component should apply this id to the corresponding [role="tabpanel"] element.
   */
  getPanelId(tabId: string): string {
    return `pds-panel-${this.tabsId}-${tabId}`;
  }

  isActive(tabId: string): boolean {
    const active = this.internalActiveTab();
    if (!active) {
      // Default: first non-disabled tab
      const first = this.tabs().find((t) => !t.disabled);
      return first?.id === tabId;
    }
    return active === tabId;
  }

  tabClasses(tab: TabItem): Record<string, boolean> {
    return {
      'pds-tab-item': true,
      'pds-tab-item--active': this.isActive(tab.id),
      'pds-tab-item--disabled': !!tab.disabled,
    };
  }

  /**
   * Roving tabindex: only the active tab is reachable with Tab.
   * Disabled tabs are excluded from keyboard navigation entirely.
   */
  tabIndex(tab: TabItem): number {
    if (tab.disabled) return -1;
    return this.isActive(tab.id) ? 0 : -1;
  }

  // ── Interaction ─────────────────────────────────────────────────────────────
  selectTab(tab: TabItem): void {
    if (tab.disabled) return;
    this.internalActiveTab.set(tab.id);
    this.tabChange.emit(tab.id);
  }

  /**
   * APG keyboard pattern for tabs (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
   * ArrowLeft / ArrowRight / Home / End navigate and auto-activate.
   */
  onKeydown(event: KeyboardEvent, tab: TabItem): void {
    const enabledTabs = this.tabs().filter((t) => !t.disabled);
    const currentIdx = enabledTabs.findIndex((t) => t.id === tab.id);
    if (currentIdx === -1) return;

    let targetTab: TabItem | undefined;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        targetTab =
          enabledTabs[
            (currentIdx - 1 + enabledTabs.length) % enabledTabs.length
          ];
        break;
      case 'ArrowRight':
        event.preventDefault();
        targetTab = enabledTabs[(currentIdx + 1) % enabledTabs.length];
        break;
      case 'Home':
        event.preventDefault();
        targetTab = enabledTabs[0];
        break;
      case 'End':
        event.preventDefault();
        targetTab = enabledTabs[enabledTabs.length - 1];
        break;
      default:
        return;
    }

    if (targetTab) {
      this.internalActiveTab.set(targetTab.id);
      this.tabChange.emit(targetTab.id);
      // Imperatively move focus to the newly activated tab
      const id = this.getTabId(targetTab.id);
      setTimeout(() => {
        const el: HTMLElement | null =
          this.elementRef.nativeElement.querySelector(`#${id}`);
        el?.focus();
      });
    }
  }
}

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

@customElement('tr-layout')
export class TRLayout extends LitElement {
	static override styles = [
		css`
      :host {
        --nav-opened-size: 300px;
        --nav-closed-size: 56px;
      }

      md-list {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: var(--nav-closed-size);
        background-color: var(--md-sys-color-surface-container);
        transition: width 100ms ease-in-out;
      }

      md-list.nav-open {
        width: var(--nav-opened-size);
      }

      main {
        position: absolute;
        top: 0;
        left: var(--nav-closed-size);
        bottom: 0;
        right: 0;
        transition: left 100ms ease-in-out;
        background-color: var(--md-sys-color-surface);
      }

      main.nav-open {
        left: var(--nav-opened-size);
      }
    `,
	];

	@state()
	set navOpen(open: boolean) {
		localStorage.setItem('tr-nav-open', open ? 'true' : 'false');
	}
	get navOpen() {
		return localStorage.getItem('tr-nav-open') !== 'false';
	}

	private navLinks = [
		['Transcodarr', 'menu', this.toggleNav],
		['Home', 'home', '/'],
		['Libraries', 'database', '/libraries'],
		['Presets', 'tune', '/presets'],
		['Queue', 'queue', '/queue'],
		['Settings', 'settings', '/settings'],
	] as const;

	private toggleNav() {
		this.navOpen = !this.navOpen;
	}

	private renderNavLink(
		name: string,
		icon: string,
		action: string | (() => void),
	) {
		const isLink = typeof action === 'string';
		const href = isLink ? action : undefined;
		const onClick = isLink ? undefined : action;

		return html`
      <md-list-item
        href=${ifDefined(href)}
        @click=${onClick}
        type=${isLink ? 'link' : 'button'}
      >
        <md-icon slot="start">${icon}</md-icon>
        ${when(
					this.navOpen,
					() => name,
					() => null,
				)}
      </md-list-item>
    `;
	}

	private renderNav() {
		return html`
      <md-list class=${classMap({ 'nav-open': this.navOpen })}>
        ${map(this.navLinks, ([name, icon, href]) =>
					this.renderNavLink(name, icon, href),
				)}
      </md-list>
    `;
	}

	protected override render() {
		return html`
      ${this.renderNav()}
      <main class=${classMap({ 'nav-open': this.navOpen })}><slot></slot></main>
    `;
	}
}

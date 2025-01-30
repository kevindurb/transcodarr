import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('tr-layout')
export class TRLayout extends LitElement {
	static override styles = [
		css`
      :root {
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

	private toggleNav() {
		this.navOpen = !this.navOpen;
	}

	protected override render() {
		return html`
      <md-list class=${classMap({ 'nav-open': this.navOpen })}>
        <md-list-item @click=${this.toggleNav} type="button">
          <md-icon slot="start">menu</md-icon>
          ${this.navOpen ? 'Transcodarr' : null}
        </md-list-item>
        <md-list-item href="/" type="link">
          <md-icon slot="start">home</md-icon>
          ${this.navOpen ? 'Home' : null}
        </md-list-item>
        <md-list-item href="/libraries" type="link">
          <md-icon slot="start">database</md-icon>
          ${this.navOpen ? 'Libraries' : null}
        </md-list-item>
        <md-list-item href="/queue" type="link">
          <md-icon slot="start">queue</md-icon>
          ${this.navOpen ? 'Queue' : null}
        </md-list-item>
        <md-list-item href="/settings" type="link">
          <md-icon slot="start">settings</md-icon>
          ${this.navOpen ? 'Settings' : null}
        </md-list-item>
      </md-list>
      <main class=${classMap({ 'nav-open': this.navOpen })}><slot></slot></main>
    `;
	}
}

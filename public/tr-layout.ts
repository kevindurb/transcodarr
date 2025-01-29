import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tr-layout')
export class TRLayout extends LitElement {
	protected override render() {
		return html`
      <nav></nav>
      <main><slot></slot></main>
    `;
	}
}

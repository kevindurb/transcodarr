import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './tr-router.ts';

@customElement('tr-app')
export class TRApp extends LitElement {
	override render() {
		return html`<tr-router></tr-router>`;
	}
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-router.ts';

@customElement('transcodarr-app')
export class TranscodarrApp extends LitElement {
	override render() {
		return html` <app-router></app-router> `;
	}
}

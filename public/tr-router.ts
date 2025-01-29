import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tr-router')
export class TRRouter extends LitElement {
	private router = new Router(this, []);

	override render() {
		return html`<tr-layout>${this.router.outlet()}</tr-layout>`;
	}
}
